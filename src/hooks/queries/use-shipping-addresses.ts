import { useQuery } from "@tanstack/react-query";

import { getUserShippingAddresses } from "@/actions/get-shipping-addresses";

export const getUseShippingAddressesQueryKey = () =>
  ["get-shipping-addresses"] as const;

export const useShippingAddresses = () => {
  return useQuery({
    queryKey: getUseShippingAddressesQueryKey(),
    queryFn: () => getUserShippingAddresses(),
  });
};
