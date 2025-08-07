import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  variantName: string;
  variantImageUrl: string;
  variantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  variantImageUrl,
  productName,
  variantName,
  quantity,
  variantPriceInCents,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          width={70}
          height={70}
          src={variantImageUrl}
          alt={productName}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {variantName}
          </p>

          <div className="flex w-26 items-center justify-between rounded-lg border">
            <Button onClick={() => {}} className="size-6" variant="ghost">
              <MinusIcon />
            </Button>

            <p className="text-sm font-medium">{quantity}</p>

            <Button onClick={() => {}} className="size-6" variant="ghost">
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>

        <p className="text-sm font-bold">
          {formatCentsToBRL(variantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
