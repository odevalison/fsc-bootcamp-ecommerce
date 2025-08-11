import { notFound } from "next/navigation";

import ProductItem from "@/components/common/product-item";
import { db } from "@/db";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const getCategory = async (categorySlug: string) => {
  const category = await db.query.categoryTable.findFirst({
    where: (category, { eq }) => eq(category.slug, categorySlug),
  });

  if (!category) {
    return notFound();
  }

  return category;
};

const getCategoryProducts = async (
  category: Awaited<ReturnType<typeof getCategory>>,
) => {
  return await db.query.productTable.findMany({
    where: (product, { eq }) => eq(product.categoryId, category.id),
    with: { variants: true },
  });
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug: categorySlug } = await params;

  const category = await getCategory(categorySlug);
  const products = await getCategoryProducts(category);

  return (
    <div className="space-y-6 px-5">
      <h2 className="text-lg font-semibold">{category.name}</h2>

      <div className="grid grid-cols-2 gap-x-3 gap-y-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
