"use client";

import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "../button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { decreaseProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { toast } from "sonner";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
  decreaseCartProductQuantityMutation.mutate(undefined, {
    onSuccess: () => {
      toast.success("Quantidade de produto diminuída.");
    },
    onError: () => {
      toast.error("Erro ao diminuir a quantidade do produto.");
    },
  });
};


  return (
    <div
      key={id}
      className="flex items-center justify-between gap-4 border-b pb-2"
    >
      <div className="flex-shrink-0">
        <Image
          src={productVariantImageUrl}
          alt={`${productVariantName}`}
          width={78}
          height={78}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{productName}</p>
        <p className="text-muted-foreground text-xs font-medium">
          {productVariantName}
        </p>

        <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
          <Button
            className="h-4 w-4"
            variant="ghost"
            onClick={handleDecreaseQuantityClick}
          >
            <MinusIcon />
          </Button>

          <p className="text-xs">{quantity}</p>
          <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>

        <p className="font-sans">
          {formatCentsToBRL(productVariantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
