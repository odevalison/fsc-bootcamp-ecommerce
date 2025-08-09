"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  removeCartProductCartSchema,
  type RemoveCartProductSchema,
} from "./schema";

export const removeCartProduct = async (data: RemoveCartProductSchema) => {
  removeCartProductCartSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (item, { eq }) => eq(item.id, data.cartItemId),
    with: { cart: true },
  });
  if (!cartItem) {
    throw new Error("Product variant not founded in your cart");
  }

  const cartDoesNotBelongsToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesNotBelongsToUser) {
    throw new Error("You don't have permission to do it");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
