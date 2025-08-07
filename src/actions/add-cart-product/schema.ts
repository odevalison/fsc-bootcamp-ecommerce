import z from "zod";

export const addToProductCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type AddToProductCartSchema = z.infer<typeof addToProductCartSchema>;
