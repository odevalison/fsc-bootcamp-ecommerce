import Image from "next/image";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";

import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";
import { loadSearchParams } from "./search-params";

interface ProductPageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

const getProduct = async (productSlug: string) => {
  const product = await db.query.productTable.findFirst({
    where: (product, { eq }) => eq(product.slug, productSlug),
    with: { variants: true },
  });

  if (!product) {
    return notFound();
  }

  return product;
};

const getProductVariant = async (variantSlug: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.slug, variantSlug),
  });

  if (!productVariant) {
    return notFound();
  }

  return productVariant;
};

const getSimilarProducts = async (categoryId: string) => {
  return await db.query.productTable.findMany({
    where: (productTable, { eq }) => eq(productTable.categoryId, categoryId),
    with: { variants: true },
  });
};

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { slug: productSlug } = await params;
  const { variant: variantSlug } = await loadSearchParams(searchParams);

  const product = await getProduct(productSlug);
  const variant = await getProductVariant(variantSlug);
  const similarProducts = await getSimilarProducts(product.categoryId);

  return (
    <div className="flex flex-col space-y-6">
      <div className="px-5">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={variant.imageUrl}
          alt={variant.name}
          className="h-auto w-full rounded-3xl"
        />
      </div>

      <div className="flex items-center gap-4 px-5">
        {product.variants.map((variant) => (
          <VariantSelector
            key={variant.id}
            product={product}
            variant={variant}
            currentVariantSlug={variantSlug}
          />
        ))}
      </div>

      <div className="space-y-4 px-5">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <h3 className="text-muted-foreground text-sm">{variant.name}</h3>
        </div>
        <h2 className="text-lg font-semibold">
          {formatCentsToBRL(variant.priceInCents)}
        </h2>
      </div>

      <ProductActions variantId={variant.id} />

      <div className="px-5">
        <p className="text-sm">{product.description}</p>
      </div>

      <ProductsList
        title="Você também pode gostar"
        products={similarProducts}
      />
    </div>
  );
};

export default ProductPage;
