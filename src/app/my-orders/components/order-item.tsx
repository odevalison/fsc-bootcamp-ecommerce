import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

interface OrderItemProps {
  item: {
    id: string;
    productName: string;
    variantName: string;
    variantImageUrl: string;
    variantPriceInCents: number;
    quantity: number;
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
          src={item.variantImageUrl}
          alt={item.productName}
          className="h-full w-auto rounded-xl"
        />
        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="text-sm font-semibold">{item.productName}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {item.variantName} x {item.quantity}
            </p>
          </div>

          <p className="font-semibold">
            {formatCentsToBRL(item.variantPriceInCents)}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
