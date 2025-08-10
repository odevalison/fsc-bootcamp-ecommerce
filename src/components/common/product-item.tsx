import Image from "next/image";
import Link from "next/link";

import type { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textsContainerMaxWidth?: string;
}

const ProductItem = ({ product, textsContainerMaxWidth }: ProductItemProps) => {
  const firstVariant = product.variants[0];

  return (
    <Link
      prefetch
      href={`/product/${product.slug}?variant=${firstVariant.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        width={0}
        height={0}
        sizes="100%"
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        className="h-[260px] w-[200px] rounded-3xl object-cover"
      />

      <div
        className={cn(
          "flex max-w-[200px] flex-col gap-6",
          textsContainerMaxWidth,
        )}
      >
        <div className="space-y-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs font-medium">
            {product.description}
          </p>
        </div>

        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
