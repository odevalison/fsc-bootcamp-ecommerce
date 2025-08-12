import Image from "next/image";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";

import ProductsList from "@/components/common/products-list";
import { getProductVariantBySlug } from "@/data/product-variant/get";
import {
  getProductsByCategoryId,
  getProductWithVariantsBySlug,
} from "@/data/products/get";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";
import { loadSearchParams } from "./search-params";

interface ProductPageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { slug: productSlug } = await params;
  const { variant: variantSlug } = await loadSearchParams(searchParams);

  const [product, productVariant] = await Promise.all([
    getProductWithVariantsBySlug(productSlug),
    getProductVariantBySlug(variantSlug),
  ]);

  if (!productVariant) {
    return notFound();
  }

  const similarProducts = await getProductsByCategoryId(product.categoryId);

  return (
    <div className="flex flex-col space-y-6">
      <div className="px-5">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={productVariant.imageUrl}
          alt={productVariant.name}
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
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
        </div>
        <h2 className="text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h2>
      </div>

      <ProductActions variantId={productVariant.id} />

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
