export { useMutation } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "../queries/use-cart";
import { addProductToCart } from "@/actions/add-cart-product";

export const INCREASE_PRODUCT_FROM_CART_MUTATION_KEY = [
  "increase-cart-product-quantity" as const,
];


export const UseIncreaseProductFromCart = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
   mutationKey: INCREASE_PRODUCT_FROM_CART_MUTATION_KEY,
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export default UseIncreaseProductFromCart;
