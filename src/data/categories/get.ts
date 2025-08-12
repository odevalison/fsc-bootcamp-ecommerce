import "server-only";

import { db } from "@/db";

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

export const getCategories = async () => {
  const categories = await db.query.categoryTable.findMany({});

  return categories as CategoryDTO[];
};

export const getCategoryBySlug = async (slug: string) => {
  const category = await db.query.categoryTable.findFirst({
    where: (category, { eq }) => eq(category.slug, slug),
  });

  return category as CategoryDTO;
};
