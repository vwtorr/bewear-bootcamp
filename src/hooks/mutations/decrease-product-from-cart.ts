export { useMutation } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "../queries/use-cart";
import { decreaseProductQuantity } from "@/actions/decrease-cart-product-quantity";

export const DECREASE_PRODUCT_FROM_CART_MUTATION_KEY = [
  "decrease-cart-product-quantity" as const,
];


export const UseDecreaseProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
   mutationKey: DECREASE_PRODUCT_FROM_CART_MUTATION_KEY,
    mutationFn: () => decreaseProductQuantity({cartItemId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export default UseDecreaseProductFromCart;
