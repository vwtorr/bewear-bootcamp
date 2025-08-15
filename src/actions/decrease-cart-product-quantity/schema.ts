import { z } from "zod";

export const decreaseProductFromCartSchema = z.object({
  cartItemId: z.uuid(),
});

export type decreaseProductFromCartSchema = z.infer<
  typeof decreaseProductFromCartSchema
>;
