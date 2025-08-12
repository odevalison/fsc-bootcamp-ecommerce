"use client";

import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import type { CartItemDto } from "@/data/cart/get";
import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProdudct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveCartProduct } from "@/hooks/mutations/use-remove-cart-product";

import { Button } from "../ui/button";

interface CartItemProps {
  item: CartItemDto;
}

const CartItem = ({ item }: CartItemProps) => {
  const removeCartProductMutation = useRemoveCartProduct(item.id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProdudct(item.id);
  const increaseCartProductQuantityMutation = useIncreaseCartProduct(
    item.productVariant.id,
  );

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
            src={item.productVariant.imageUrl}
            alt={item.productVariant.product.name}
            className="rounded-lg"
          />

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold">
                {item.productVariant.product.name}
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                {item.productVariant.name}
              </p>
            </div>

            <div className="flex h-10 w-24 items-center justify-evenly gap-2 rounded-xl border">
              {item.quantity > 1 ? (
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

              <p className="text-sm font-medium">{item.quantity}</p>

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
            {formatCentsToBRL(item.productVariant.priceInCents * item.quantity)}
          </p>

          {item.quantity > 1 && (
            <Button
              onClick={handleDeleteProduct}
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
