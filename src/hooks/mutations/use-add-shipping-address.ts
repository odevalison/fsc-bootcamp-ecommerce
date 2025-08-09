import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addShippingAddress } from "@/actions/add-shipping-address";

import { getUseCartQueryKey } from "../queries/use-cart";
import { getUseShippingAddressesQueryKey } from "../queries/use-shipping-addresses";

export const getUseAddShippingAddressMutationKey = () =>
  ["add-shipping-address"] as const;

export const useAddShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseAddShippingAddressMutationKey(),
    mutationFn: addShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseShippingAddressesQueryKey(),
      });
    },
  });
};
