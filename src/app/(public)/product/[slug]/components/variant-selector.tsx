import Image from "next/image";
import Link from "next/link";

import type { ProductVariantDto } from "@/data/product-variant/get";
import type { ProductWithVariantsDto } from "@/data/products/get";

interface VariantSelectorProps {
  currentVariantSlug: string;
  product: ProductWithVariantsDto;
  variant: ProductVariantDto;
}

const VariantSelector = ({
  currentVariantSlug,
  product,
  variant,
}: VariantSelectorProps) => {
  return (
    <Link
      href={`/product/${product.slug}?variant=${variant.slug}`}
      className={`${variant.slug === currentVariantSlug && "ring-primary rounded-2xl ring-2"}`}
    >
      <Image
        width={68}
        height={68}
        src={variant.imageUrl}
        alt={variant.name}
        className="rounded-2xl"
      />
    </Link>
  );
};

export default VariantSelector;
