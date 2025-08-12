import Image from "next/image";
import Link from "next/link";

import type { ProductWithVariantsDto } from "@/data/products/get";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductItemProps {
  product: ProductWithVariantsDto;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link
      href={`/product/${product.slug}?variant=${product.variants[0].slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        width={0}
        height={0}
        sizes="100%"
        src={product.variants[0].imageUrl}
        alt={product.variants[0].name}
        className="h-[260px] w-[200px] rounded-3xl object-cover"
      />

      <div className={"flex max-w-[200px] flex-col gap-6"}>
        <div className="space-y-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs font-medium">
            {product.description}
          </p>
        </div>

        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(product.variants[0].priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
