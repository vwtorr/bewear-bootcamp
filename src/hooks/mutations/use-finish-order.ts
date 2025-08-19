import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishOrder } from "@/actions/finish-order";

import { CART_QUERY_KEY } from "../queries/use-cart";

export const USE_FINISH_ORDER = [
    "finish-order" as const,
  ];

export const useFinishOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: USE_FINISH_ORDER,
    mutationFn: async () => {
      return await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USE_FINISH_ORDER });
    },
  });
};