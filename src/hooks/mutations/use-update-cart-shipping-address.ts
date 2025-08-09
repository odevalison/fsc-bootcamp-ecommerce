import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";

import { getUseShippingAddressesQueryKey } from "../queries/use-shipping-addresses";

export const getUseUpdateCartShippingAddresMutationKey = () =>
  ["update-cart-shipping-address"] as const;

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseUpdateCartShippingAddresMutationKey(),
    mutationFn: updateCartShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseShippingAddressesQueryKey(),
      });
    },
  });
};
