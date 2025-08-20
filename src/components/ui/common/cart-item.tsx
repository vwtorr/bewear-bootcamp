"use client";

import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "../button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import UseRemoveProductFromCart from "@/hooks/mutations/remove-product-from-cart";
import UseIncreaseProductFromCart from "@/hooks/mutations/increase-product-from-cart";
import UseDecreaseProductFromCart from "@/hooks/mutations/decrease-product-from-cart";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
  productVariantId: string;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
  productVariantId,
}: CartItemProps) => {
  const removeProductFromCartMutation = UseRemoveProductFromCart(id);

  const increaseCartProductQuantityMutation =
    UseIncreaseProductFromCart(productVariantId);

  const decreaseCartProductQuantityMutation = UseDecreaseProductFromCart(id);

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

  const handleIncluseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao adicionar quantidade no produto.");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao diminuir a quantidade do produto.");
      },
    });
  };

  return (
    <div
      key={id}
      className="flex w-full items-start justify-between border-b pb-2"
    >
      <div className="flex-shrink-0 mr-4">
        <Image
          src={productVariantImageUrl}
          alt={`${productVariantName}`}
          width={78}
          height={78}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 flex-grow min-w-0">
        <div className="flex justify-between items-start w-full">
          <p className="text-sm font-semibold max-w-[calc(100%-24px)] overflow-hidden text-ellipsis whitespace-nowrap">
            {productName}
          </p>
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDeleteClick}
              className="w-6 h-6"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

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
          <Button
            className="h-4 w-4"
            variant="ghost"
            onClick={handleIncluseQuantityClick}
          >
            <PlusIcon />
          </Button>
        </div>
        <p className="font-sans text-right mt-2 w-full">
          {formatCentsToBRL(productVariantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
