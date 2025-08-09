"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProdudct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveCartProduct } from "@/hooks/mutations/use-remove-cart-product";

import { Button } from "../ui/button";

interface CartItemProps {
  cartItemId: string;
  productName: string;
  variantId: string;
  variantName: string;
  variantImageUrl: string;
  variantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  cartItemId,
  variantId,
  variantImageUrl,
  productName,
  variantName,
  variantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeCartProductMutation = useRemoveCartProduct(cartItemId);
  const decreaseCartProductQuantityMutation =
    useDecreaseCartProdudct(cartItemId);
  const increaseCartProductQuantityMutation = useIncreaseCartProduct(variantId);

  const handleDeleteProduct = () => {
    removeCartProductMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto, tente novamente.");
      },
    });
  };

  const handleDecreaseProductQuantity = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao diminuir quantidade do produto.");
      },
    });
  };

  const handleIncreaseProductQuantity = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao aumentar quantidade do produto.");
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
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
            <Button
              onClick={handleDecreaseProductQuantity}
              className="size-6"
              variant="ghost"
            >
              <MinusIcon />
            </Button>

            <p className="text-sm font-medium">{quantity}</p>

            <Button
              onClick={handleIncreaseProductQuantity}
              className="size-6"
              variant="ghost"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteProduct}>
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
