import { useQuery } from "@tanstack/react-query";

import { getUserShippingAddresses } from "@/actions/get-shipping-addresses";
import type { shippingAdressTable } from "@/db/schema";

export const getUseShippingAddressesQueryKey = () =>
  ["get-shipping-addresses"] as const;

export const useShippingAddresses = (params?: {
  initialData: (typeof shippingAdressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getUseShippingAddressesQueryKey(),
    queryFn: () => getUserShippingAddresses(),
    initialData: params?.initialData,
  });
};
