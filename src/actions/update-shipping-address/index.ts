"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateShippingAddressSchema,
  updateShippingAddressSchema,
} from "./schema";

export const updateShippingAddress = async (
  data: UpdateShippingAddressSchema,
) => {
  updateShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (address, { eq, and }) =>
      and(eq(address.id, data.id), eq(address.userId, session.user.id)),
  });

  if (!shippingAddress) {
    throw new Error("Shipping address not found or unauthorized");
  }

  await db
    .update(shippingAddressTable)
    .set({
      email: data.email,
      recipientName: data.recipientName,
      cpfOrCnpj: data.cpfOrCnpj,
      phone: data.phone,
      zipCode: data.zipCode,
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
    })
    .where(eq(shippingAddressTable.id, data.id));

  return { success: true, id: shippingAddress.id };
}; 