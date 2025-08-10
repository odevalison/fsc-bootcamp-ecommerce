"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { auth } from "@/lib/auth";

import {
  type CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export const createCheckoutSession = async (
  data: CreateCheckoutSessionSchema,
) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Unauthorized!");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const { orderId } = createCheckoutSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: (order, { eq, and }) => {
      return and(eq(order.userId, session.user.id), eq(order.id, orderId));
    },
    with: {
      items: { with: { productVariant: { with: { product: true } } } },
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: order.items.map((cartItem) => ({
      price_data: {
        currency: "BRL",
        product_data: {
          name: `${cartItem.productVariant.product.name} - ${cartItem.productVariant.name}`,
          description: cartItem.productVariant.product.description,
          images: [cartItem.productVariant.imageUrl],
        },
        // Em centavos:
        unit_amount: cartItem.productVariant.priceInCents,
      },
      quantity: cartItem.quantity,
    })),
  });

  return checkoutSession;
};
