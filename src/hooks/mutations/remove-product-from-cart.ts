export { useMutation } from "@tanstack/react-query";

import { removeProductFromCart } from "@/actions/remove-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "../queries/use-cart";

export const REMOVE_PROCUCT_FROM_CART_MUTATION_KEY = [
  "remove-cart-product" as const,
];

export const UseRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: REMOVE_PROCUCT_FROM_CART_MUTATION_KEY,
    mutationFn: () => removeProductFromCart({ cartItemId: cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
};

export default UseRemoveProductFromCart;
