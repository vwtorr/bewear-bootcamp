import { createShippingAddress } from "@/actions/create-shipping-address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UPDATE_SHOPPING_ADDRESS_MUTATION_KEY } from "./use-update-cart-shipping-address";
import { getUserAddressesQueryKey } from "../queries/use-user-addresses";


export const CREATE_SHIPPING_ADDRESS_MUTATION_KEY = [
    "create-shipping-address" as const,
  ];
  

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CREATE_SHIPPING_ADDRESS_MUTATION_KEY,
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
};