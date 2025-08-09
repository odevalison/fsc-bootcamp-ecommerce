"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAdressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  type AddShippingAddressSchema,
  addShippingAddressSchema,
} from "./schema";

export const addShippingAddress = async (data: AddShippingAddressSchema) => {
  addShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("You don't have permission to do it");
  }

  const [shippingAddress] = await db
    .insert(shippingAdressTable)
    .values({ ...data, country: "Brasil", userId: session.user.id })
    .returning();

  revalidatePath("/cart/identification");

  return shippingAddress;
};
