import "server-only";

import { db } from "@/db";

import type { ProductDto } from "../products/get";

export interface ProductVariantDto {
  id: string;
  name: string;
  createdAt: Date;
  slug: string;
  imageUrl: string;
  priceInCents: number;
}

export interface ProductVariantWithProductDto extends ProductVariantDto {
  product: ProductDto;
}

export const getProductVariantBySlug = async (
  slug: string,
): Promise<ProductVariantDto> => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.slug, slug),
  });

  return productVariant as ProductVariantDto;
};
