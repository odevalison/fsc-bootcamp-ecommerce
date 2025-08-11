"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAddProductToCart } from "@/hooks/mutations/use-add-product-to-cart";

interface AddToCartButtonProps {
  variantId: string;
  quantity: number;
}

const AddToCartButton = ({ variantId, quantity }: AddToCartButtonProps) => {
  const addProductToCartMutation = useAddProductToCart(variantId, quantity);

  const handleAddProductToCart = async () => {
    await addProductToCartMutation.mutateAsync();
  };

  return (
    <Button
      disabled={addProductToCartMutation.isPending}
      onClick={handleAddProductToCart}
      size="lg"
      variant="outline"
      className="flex items-center justify-center rounded-full"
    >
      {addProductToCartMutation.isPending && (
        <Loader2 className="animate-spin" />
      )}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
