import Image from "next/image";

import type { CartItemDto } from "@/data/cart/get";
import { formatCentsToBRL } from "@/helpers/money";

interface CartItemSummaryProps {
  item: CartItemDto;
}

const CartItemSummary = ({ item }: CartItemSummaryProps) => {
  return (
    <div className="divide-accent space-y-4 divide-y-[1.5px]">
      <div className="flex w-full items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          <Image
            width={70}
            height={70}
            src={item.productVariant.imageUrl}
            alt={item.productVariant.product.name}
            className="rounded-lg"
          />

          <div className="flex flex-col items-start gap-1">
            <p className="text-xs font-semibold">
              {item.productVariant.product.name}
            </p>

            <p className="text-muted-foreground text-xs font-medium">
              {item.productVariant.name} x {item.quantity}
            </p>

            <p className="text-sm font-semibold">
              {formatCentsToBRL(
                item.productVariant.priceInCents * item.quantity,
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSummary;
