import { notFound } from "next/navigation";

import ProductItem from "@/components/common/product-item";
import { getCategoryBySlug } from "@/data/categories/get";
import { getProductsByCategoryId } from "@/data/products/get";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug: categorySlug } = await params;

  const category = await getCategoryBySlug(categorySlug);
  const products = await getProductsByCategoryId(category.id);

  if (!category || !products) {
    return notFound();
  }

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
