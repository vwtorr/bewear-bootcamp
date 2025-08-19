import { updateShippingAddress } from "@/actions/update-shipping-address";
import { UpdateShippingAddressSchema } from "@/actions/update-shipping-address/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUserAddressesQueryKey } from "../queries/use-user-addresses";

export const UPDATE_SHIPPING_ADDRESS_MUTATION_KEY = [
  "update-shipping-address" as const,
];

export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: UPDATE_SHIPPING_ADDRESS_MUTATION_KEY,
    mutationFn: (data: UpdateShippingAddressSchema) =>
      updateShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
}; 