"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: async () => {
      if (!productVariantId) {
        throw new Error("ID da variante do produto não informado.");
      }
      if (quantity < 1) {
        throw new Error("Quantidade inválida.");
      }
      return addProductToCart({ productVariantId, quantity });
    },
    onSuccess: () => {
      toast.success("Produto adicionado ao carrinho!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      if (error.message === "Você precisa estar logado para visualizar o carrinho.") {
        toast.error(error.message);
      } else {
        toast.error("Erro ao adicionar produto ao carrinho");
        console.error(error);
      }
    },
  });

  return (
    <Button
      className="w-full rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="mr-2 animate-spin" />}
      {isSuccess && <Check className="mr-2" />}
      {isSuccess ? "Adicionado!" : "Adicionar à sacola"}
    </Button>
  );
};

export default AddToCartButton;
