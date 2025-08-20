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
import { Separator } from "../separator";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";
import CartItem from "./cart-item";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import useCart from "@/hooks/queries/use-cart";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { data, isLoading, isError } = useCart();
  const router = useRouter();
  const [isFinishingOrder, setIsFinishingOrder] = useState(false);

  if (isLoading) {
    return (
      <Button variant="outline" size="icon">
        <ShoppingBasketIcon />
      </Button>
    );
  }

  if (isError || !data) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Seu Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground">
              Você precisa estar logado para visualizar o carrinho.
            </p>
            <Button onClick={() => router.push("/auth")}>
              Fazer Login
            </Button>
          </div>
        </SheetContent>
      </Sheet>
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
        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-4">
                  {data?.items?.length ? (
                    <ul className="space-y-4">
                      {data.items.map((item) => (
                        <li key={item.id}>
                          <CartItem
                            id={item.id}
                            productVariantId={item.productVariantId}
                            productName={item.productVariant.product.name}
                            productVariantName={item.productVariant.name}
                            productVariantImageUrl={
                              item.productVariant.imageUrl
                            }
                            productVariantPriceInCents={
                              item.productVariant.priceInCents
                            }
                            quantity={item.quantity}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Seu carrinho está vazio</p>
                  )}
                </div>
              </ScrollArea>
              
              {data?.items?.length ? (
                <div className="mt-auto pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Subtotal</p>
                    <p>{formatCentsToBRL(data?.totalPriceInCents ?? 0)}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Entrega</p>
                    <p>GRÁTIS</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Total</p>
                    <p>{formatCentsToBRL(data?.totalPriceInCents ?? 0)}</p>
                  </div>
                  
                  <Button
                    className="mt-5 rounded-full w-full"
                    onClick={() => {
                      setIsFinishingOrder(true);
                      router.push("/cart/identification");
                    }}
                    disabled={isFinishingOrder}
                  >
                    {isFinishingOrder && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    Finalizar compra
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;