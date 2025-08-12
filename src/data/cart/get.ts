import { db } from "@/db";

import type { ProductVariantWithProductDto } from "../product-variant/get";
import type { ShippingAddressDto } from "../shipping-address/get";

export interface CartItemDto {
  id: string;
  createdAt: Date;
  cartId: string;
  productVariantId: string;
  quantity: number;
  productVariant: ProductVariantWithProductDto;
}

export interface CartDto {
  id: string;
  createdAt: Date;
  userId: string;
  shippingAddressId: string | null;
  shippingAddress?: ShippingAddressDto;
  items: CartItemDto[];
}

export const getCartByUserId = async (userId: string) => {
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, userId),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return cart as CartDto;
};
