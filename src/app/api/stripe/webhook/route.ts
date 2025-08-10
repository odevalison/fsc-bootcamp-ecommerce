import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { cartItemTable, cartTable, orderTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.error();
  } else if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const orderId = checkoutSession.metadata?.orderId;
    if (!orderId) {
      return NextResponse.error();
    }

    const [order] = await db
      .update(orderTable)
      .set({ status: "paid" })
      .where(eq(orderTable.id, orderId))
      .returning();

    console.log("Pedido atualizado");

    const [deletedCart] = await db
      .delete(cartTable)
      .where(eq(cartTable.userId, order.userId))
      .returning();
    console.log("Carrinho deletado");
    await db
      .delete(cartItemTable)
      .where(eq(cartItemTable.cartId, deletedCart.id));
    console.log("Item do carrinho deletado");
  }

  return NextResponse.json({ received: true });
};
