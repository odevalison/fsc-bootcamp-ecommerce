import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/actions/get-oders";
import type { GetOrdersSchema } from "@/actions/get-oders/schema";

export const getUseOrdersQueryKey = () => ["orders"] as const;

export const useOrders = (data: GetOrdersSchema) => {
  return useQuery({
    queryKey: getUseOrdersQueryKey(),
    queryFn: () => getOrders(data),
  });
};
