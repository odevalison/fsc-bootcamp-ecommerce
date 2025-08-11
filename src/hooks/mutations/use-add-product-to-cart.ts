import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseAddProductToCartMutationKey = (
  variantId: string,
  quantity: number,
) => ["add-product-to-cart", variantId, quantity] as const;

export const useAddProductToCart = (variantId: string, quantity: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseAddProductToCartMutationKey(variantId, quantity),
    mutationFn: () => {
      return addProductToCart({ productVariantId: variantId, quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
