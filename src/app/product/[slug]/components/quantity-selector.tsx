"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useQueryState(
    "qty",
    parseAsInteger.withDefault(1),
  );

  const handleIncrementQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrementQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>

      <div className="flex w-28 items-center justify-between rounded-lg border">
        <Button onClick={handleDecrementQty} size="icon" variant="ghost">
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button onClick={handleIncrementQty} size="icon" variant="ghost">
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
