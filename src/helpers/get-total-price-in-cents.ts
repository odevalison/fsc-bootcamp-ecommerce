import type { CartDto } from "@/data/cart/get";

export const getPriceTotalInCents = (cart: CartDto) => {
  const cartTotalInCents = cart.items.reduce((acc, item) => {
    return (acc += item.productVariant.priceInCents * item.quantity);
  }, 0);

  return cartTotalInCents;
};
