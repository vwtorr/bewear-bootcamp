import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import ProgressIndicator from "../components/progress-indicator";
import FinishOrderButton from "./components/finish-order-button";
import { formatAddress } from "../helpers/addresses";
import { Header } from "@/components/ui/common/header";
import Footer from "@/components/ui/common/footer";

const ConfirmationPage = async () => {
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
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div>
      <Header />

      <div className="space-y-4 px-5 pb-8 pt-6 md:px-6 lg:container lg:px-16 mx-auto">
        <ProgressIndicator />

        <div className="flex flex-col items-start gap-x-12 gap-y-6 md:flex-row">
          <div className="w-full md:max-w-[500px]">
            <Card>
              <CardHeader>
                <CardTitle>Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="relative">
                  <CardContent className="flex flex-col pt-4">
                    <span className="text-sm font-semibold">Identificação</span>
                    <p className="text-sm text-muted-foreground">
                      {formatAddress(cart.shippingAddress)}
                    </p>
                  </CardContent>
                  <Button
                    variant="link"
                    size="sm"
                    className="absolute right-2 top-2"
                    asChild
                  >
                    <Link href="/cart/identification">Alterar</Link>
                  </Button>
                </Card>
                <FinishOrderButton />
              </CardContent>
            </Card>
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

export default ConfirmationPage;