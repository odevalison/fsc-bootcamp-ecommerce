import z from "zod";

export const getOrdersSchema = z.object({
  userId: z.string(),
});

export type GetOrdersSchema = z.infer<typeof getOrdersSchema>;
