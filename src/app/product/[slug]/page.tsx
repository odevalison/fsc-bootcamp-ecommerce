import Image from "next/image";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
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

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { slug } = await params;
  const { variant: variantSlug } = await loadSearchParams(searchParams);

  const product = await db.query.productTable.findFirst({
    where: (product, { eq }) => eq(product.slug, slug),
    with: { variants: true },
  });

  const variant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.slug, variantSlug),
  });

  if (!product) {
    return notFound();
  } else if (!variant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: (productTable, { eq }) =>
      eq(productTable.categoryId, product.categoryId),
    with: { variants: true },
  });

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={variant.imageUrl}
          alt={variant.name}
          className="h-auto w-full"
        />

        <div className="px-5">
          <VariantSelector
            selectedVariant={variantSlug}
            product={product}
            variants={product.variants}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <h3 className="text-muted-foreground text-sm">{variant.name}</h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(variant.priceInCents)}
          </h3>
        </div>

        <ProductActions variantId={variant.id} />

        <div className="px-5">
          <p className="text-sm">{product.description}</p>
        </div>

        <ProductsList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
