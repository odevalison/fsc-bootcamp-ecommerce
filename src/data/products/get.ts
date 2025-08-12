import "server-only";

import { desc } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";

// ProductDTO
export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  categoryId: string;
}

export interface ProductWithVariantsDto extends ProductDto {
  variants: Array<{
    id: string;
    name: string;
    createdAt: Date;
    slug: string;
    productId: string;
    imageUrl: string;
    color: string;
    priceInCents: number;
  }>;
}

export const getProductsWithVariants = async () => {
  const product = await db.query.productTable.findMany({
    with: { variants: true },
  });

  return product as ProductWithVariantsDto[];
};

export const getNewlyCreatedProducts = async () => {
  const products = await db.query.productTable.findMany({
    orderBy: desc(productTable.createdAt),
    with: { variants: true },
  });

  return products as ProductWithVariantsDto[];
};

export const getProductBySlug = async (slug: string) => {
  const product = await db.query.productTable.findFirst({
    where: (product, { eq }) => eq(product.slug, slug),
  });

  return product as ProductDto;
};

export const getProductWithVariantsBySlug = async (slug: string) => {
  const product = await db.query.productTable.findFirst({
    where: (product, { eq }) => eq(product.slug, slug),
    with: { variants: true },
  });

  return product as ProductWithVariantsDto;
};

export const getProductsByCategoryId = async (categoryId: string) => {
  const products = await db.query.productTable.findMany({
    where: (product, { eq }) => eq(product.categoryId, categoryId),
    with: { variants: true },
  });

  return products as ProductWithVariantsDto[];
};
