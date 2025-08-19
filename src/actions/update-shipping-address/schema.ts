import { z } from "zod";

export const updateShippingAddressSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email("E-mail inválido"),
  recipientName: z.string().min(1, "Nome completo é obrigatório"),
  cpfOrCnpj: z.string().min(14, "CPF inválido"),
  phone: z.string().min(15, "Celular inválido"),
  zipCode: z.string().min(9, "CEP inválido"),
  street: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export type UpdateShippingAddressSchema = z.infer<
  typeof updateShippingAddressSchema
>; 