import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseIncreaseCartProductMutationKey = (variantId: string) =>
  ["increase-cart-product-quantity", variantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
