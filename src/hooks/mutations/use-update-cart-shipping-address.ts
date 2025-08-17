import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import { UpdateCartShippingAddressSchema } from "@/actions/update-cart-shipping-address/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const UPDATE_SHOPPING_ADDRESS_MUTATION_KEY = [
    "create-shipping-address" as const,
  ];

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-cart-shipping-address",
];

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: UPDATE_SHOPPING_ADDRESS_MUTATION_KEY,
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UPDATE_SHOPPING_ADDRESS_MUTATION_KEY,
      });
    },
  });
};