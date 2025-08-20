import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

export const POST = async (request: Request) => {
  console.log("Stripe webhook received.");
  const signature = request.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Stripe secret key or webhook secret not configured.");
    return NextResponse.error();
  }

  if (!signature) {
    console.error("Stripe signature missing.");
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
    console.log(`Stripe event type: ${event.type}`);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.error();
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    console.log(`Checkout session completed. Order ID from metadata: ${orderId}`);
    if (!orderId) {
      console.error("Order ID not found in session metadata.");
      return NextResponse.error();
    }

    try {
      await db
        .update(orderTable)
        .set({ status: "paid" })
        .where(eq(orderTable.id, orderId));
      console.log(`Order ${orderId} status updated to 'paid'.`);
    } catch (dbError) {
      console.error(`Failed to update order ${orderId} status:`, dbError);
    }
  }

  return NextResponse.json({ received: true });
};
