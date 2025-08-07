import Image from "next/image";
import Link from "next/link";

import type { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectedVariant: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  variants,
  selectedVariant,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product/${variant.slug}`}
          key={variant.id}
          className={`${selectedVariant === variant.slug && "ring-primary rounded-xl ring-2"}`}
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
