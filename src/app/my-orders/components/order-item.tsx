import Image from "next/image";

import type {
  orderItemTable,
  productTable,
  productVariantTable,
} from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface OrderItemProps {
  item: typeof orderItemTable.$inferSelect & {
    productVariant: typeof productVariantTable.$inferSelect & {
      product: typeof productTable.$inferSelect;
    };
  };
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <>
      <div className="flex h-22 items-center gap-4">
        <Image
          width={0}
          height={0}
          sizes="100%"
          src={item.productVariant.imageUrl}
          alt={item.productVariant.product.name}
          className="h-full w-auto rounded-xl"
        />
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="text-sm font-semibold">
              {item.productVariant.product.name}
            </p>
            <p className="text-muted-foreground text-xs font-medium">
              {item.productVariant.name} x {item.quantity}
            </p>
          </div>

          <p className="font-semibold">
            {formatCentsToBRL(item.productVariant.priceInCents)}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
