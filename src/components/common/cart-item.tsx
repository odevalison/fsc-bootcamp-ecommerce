"use client";

import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
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
    <div className="relative flex items-center justify-between">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={86}
            height={86}
            src={variantImageUrl}
            alt={productName}
            className="rounded-lg"
          />

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold">{productName}</p>
              <p className="text-muted-foreground text-xs font-medium">
                {variantName}
              </p>
            </div>

            <div className="flex h-10 w-24 items-center justify-evenly gap-2 rounded-xl border">
              {quantity > 1 ? (
                <Button
                  onClick={handleDecreaseProductQuantity}
                  variant="ghost"
                  className="size-4"
                >
                  <MinusIcon />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleDeleteProduct}
                  className="size-4"
                >
                  <Trash2 />
                </Button>
              )}

              <p className="text-sm font-medium">{quantity}</p>

              <Button
                onClick={handleIncreaseProductQuantity}
                variant="ghost"
                className="size-4"
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <p className="text-sm font-semibold">
            {formatCentsToBRL(variantPriceInCents * quantity)}
          </p>

          {quantity > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl"
            >
              <Trash2 className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
