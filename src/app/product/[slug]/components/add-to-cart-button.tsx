"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["add-product-to-cart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      size="lg"
      variant="outline"
      className="flex flex-row items-center justify-center rounded-full"
    >
      {isPending && <Loader2 className="animate-spin" />}
      {!isPending && "Adicionar à sacola"}
    </Button>
  );
};

export default AddToCartButton;
