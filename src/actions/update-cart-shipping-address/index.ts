"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  type UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const shippingAddress = await db.query.shippingAdressTable.findFirst({
    where: (shippingAddress, { eq, and }) =>
      and(
        eq(shippingAddress.userId, session.user.id),
        eq(shippingAddress.id, data.shippingAddressId),
      ),
  });
  if (!shippingAddress) {
    throw new Error("Shipping address not found");
  }

  const userCart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });
  if (!userCart) {
    throw new Error("User cart not founded");
  }

  await db
    .update(cartTable)
    .set({ shippingAdressId: data.shippingAddressId })
    .where(eq(cartTable.userId, session.user.id));
};
