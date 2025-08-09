"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  type DecreaseCartProductQuantitySchema,
  decreaseCartProductQuantitySchema,
} from "./schema";

export const decreaseCartProductQuantity = async (
  data: DecreaseCartProductQuantitySchema,
) => {
  decreaseCartProductQuantitySchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("You need to be authenticated to do it!");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (item, { eq }) => eq(item.id, data.cartItemId),
    with: { cart: true },
  });
  if (!cartItem) {
    throw new Error("Cart item does not founded!");
  }

  const cartDoesNotBelongsToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesNotBelongsToUser) {
    throw new Error("You don't have permission to do it!");
  }

  if (cartItem.quantity > 1) {
    await db
      .update(cartItemTable)
      .set({ quantity: cartItem.quantity - 1 })
      .where(eq(cartItemTable.id, cartItem.id));
    return;
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
