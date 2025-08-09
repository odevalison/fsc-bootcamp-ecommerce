import z from "zod";

export const removeCartProductCartSchema = z.object({
  cartItemId: z.uuid(),
});

export type RemoveCartProductSchema = z.infer<
  typeof removeCartProductCartSchema
>;
