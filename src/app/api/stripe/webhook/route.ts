import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { clearCart } from "@/actions/clear-cart";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.error();
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.error();
    }

    await db
      .update(orderTable)
      .set({ status: "paid" })
      .where(eq(orderTable.id, orderId));

    await clearCart({});
  }

  return NextResponse.json({ received: true });
};
