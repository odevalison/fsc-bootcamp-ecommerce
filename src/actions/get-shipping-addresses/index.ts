"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export const getUserShippingAddresses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("You don't have permission to do it!");
  }

  const addresses = await db.query.shippingAdressTable.findMany({
    where: (shippingAddress, { eq }) =>
      eq(shippingAddress.userId, session.user.id),
    orderBy: (shippingAddress, { desc }) => [desc(shippingAddress.createdAt)],
  });

  return addresses;
};
