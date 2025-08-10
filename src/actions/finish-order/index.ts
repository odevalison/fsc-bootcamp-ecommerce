"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import {
  cartItemTable,
  cartTable,
  orderItemTable,
  orderTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

export const finishOrder = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: { productVariant: true },
      },
    },
  });
  if (!cart) {
    throw new Error("Cart not found");
  }

  let orderId: string | undefined;

  await db.transaction(async (tx) => {
    if (!cart.shippingAddress) {
      throw new Error("Shipping address not found");
    }

    const totalPriceInCents = cart.items.reduce((acc, item) => {
      return (acc += item.productVariant.priceInCents * item.quantity);
    }, 0);

    const [order] = await tx
      .insert(orderTable)
      .values({
        userId: session.user.id,
        shippingAddressId: cart.shippingAddress.id,
        zipCode: cart.shippingAddress.zipCode,
        city: cart.shippingAddress.city,
        country: cart.shippingAddress.country,
        cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
        email: cart.shippingAddress.email,
        neighborhood: cart.shippingAddress.neighborhood,
        number: cart.shippingAddress.number,
        phone: cart.shippingAddress.phone,
        recipientName: cart.shippingAddress.recipientName,
        state: cart.shippingAddress.state,
        street: cart.shippingAddress.street,
        complement: cart.shippingAddress.complement,
        totalPriceInCents,
      })
      .returning();
    if (!order) {
      throw new Error("Failed to create order");
    }

    orderId = order.id;

    const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> =
      cart?.items.map((item) => ({
        orderId: order.id,
        shippingAddressId: order.shippingAddressId,
        productVariantId: item.productVariant.id,
        quantity: item.quantity,
        priceInCents: totalPriceInCents,
      }));
    await tx.insert(orderItemTable).values(orderItemsPayload);

    await tx
      .delete(cartTable)
      .where(
        and(eq(cartTable.id, cart.id), eq(cartTable.userId, session.user.id)),
      );
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
  });
  if (!orderId) {
    throw new Error("Failed to create order");
  }

  return { orderId };
};
