import { db } from "@/db";

import type { ProductVariantWithProductDto } from "../product-variant/get";
import type { SessionDto } from "../session/get";

export interface OrderItemDto {
  id: string;
  createdAt: Date;
  priceInCents: number;
  productVariantId: string;
  quantity: number;
  orderId: string;
  productVariant: ProductVariantWithProductDto;
}

export interface OrderDto {
  number: string;
  id: string;
  email: string;
  createdAt: Date;
  userId: string;
  recipientName: string;
  cpfOrCnpj: string;
  street: string;
  complement: string | null;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
  country: string;
  phone: string;
  shippingAddressId: string;
  totalPriceInCents: number;
  status: "pending" | "paid" | "canceled";
  items: OrderItemDto[];
}

export const getOrders = async (session: SessionDto) => {
  const orders = await db.query.orderTable.findMany({
    where: (orders, { eq }) => eq(orders.userId, session?.user!.id),
    with: {
      items: {
        with: { productVariant: { with: { product: true } } },
      },
    },
  });

  return orders as OrderDto[];
};
