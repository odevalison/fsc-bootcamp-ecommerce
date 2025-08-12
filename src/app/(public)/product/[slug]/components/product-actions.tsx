"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  variantId: string;
}

const ProductActions = ({ variantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useQueryState(
    "quantity",
    parseAsInteger.withDefault(1),
  );

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>

          <div className="flex w-28 items-center justify-between rounded-lg border">
            <Button
              onClick={handleDecreaseQuantity}
              size="icon"
              variant="ghost"
            >
              <MinusIcon />
            </Button>

            <p className="text-sm font-medium">{quantity}</p>

            <Button
              onClick={handleIncreaseQuantity}
              size="icon"
              variant="ghost"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 px-5">
        <AddToCartButton quantity={quantity} variantId={variantId} />
        <Button size="lg" className="rounded-full">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
