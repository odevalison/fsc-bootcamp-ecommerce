"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

import { type GetOrdersSchema, getOrdersSchema } from "./schema";

export const getOrders = async (data: GetOrdersSchema) => {
  const { userId } = getOrdersSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  const orders = await db.query.orderTable.findMany({
    where: (orders, { eq }) => eq(orders.userId, userId),
    with: { items: true },
  });
  if (!orders) {
    return {
      orders: [],
    };
  }

  return orders;
};
