import z from "zod";

export const clearCartSchema = z.object({});

export type ClearCartSchema = z.infer<typeof clearCartSchema>; 