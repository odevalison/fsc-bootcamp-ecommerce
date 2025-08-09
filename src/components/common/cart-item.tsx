import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeCartProduct } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

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
  variantImageUrl,
  productName,
  variantName,
  variantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const removeCartProductMutation = useMutation({
    mutationKey: ["remove-cart-product", cartItemId],
    mutationFn: () => removeCartProduct({ cartItemId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity", cartItemId],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

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
            <Button
              onClick={handleDecreaseProductQuantity}
              className="size-6"
              variant="ghost"
            >
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
