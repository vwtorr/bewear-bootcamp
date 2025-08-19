import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import ProgressIndicator from "../components/progress-indicator";
import Addresses from "./components/addresses";
import Footer from "@/components/ui/common/footer";
import { Header } from "@/components/ui/common/header";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div>
      <Header />

      <div className="space-y-4 px-5 pb-8 pt-6 md:px-6 lg:container lg:px-16 mx-auto">
        <ProgressIndicator />

        <div className="flex flex-col items-start gap-x-12 gap-y-6 md:flex-row">
          <div className="w-full md:max-w-[800px]">
            <Addresses
              shippingAddresses={shippingAddresses}
              defaultShippingAddressId={cart.shippingAddress?.id || null}
            />
          </div>

          <div className="w-full flex-1">
            <CartSummary
              subtotalInCents={cartTotalInCents}
              totalInCents={cartTotalInCents}
              products={cart.items.map((item) => ({
                id: item.productVariant.id,
                name: item.productVariant.product.name,
                variantName: item.productVariant.name,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
                imageUrl: item.productVariant.imageUrl,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentificationPage;