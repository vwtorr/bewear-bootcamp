"use client";

import { ShoppingBasketIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../sheet";
import { Button } from "../button";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";
import CartItem from "./cart-item";

const Cart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  if (isLoading || isError) {
    return (
      <Button variant="outline" size="icon">
        <ShoppingBasketIcon />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="px-5 space-y-4">
          {data?.items?.length ? (
            <>
              <ul className="space-y-4">
                {data.items.map((item) => (
                  <li key={item.id}>
                    <CartItem
                      id={item.id}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={item.productVariant.priceInCents}
                      quantity={item.quantity}
                    />
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatCentsToBRL(data.totalPriceInCents)}</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Seu carrinho está vazio</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
