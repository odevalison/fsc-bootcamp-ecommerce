import { redirect } from "next/navigation";

import { getCartByUserId } from "@/data/cart/get";
import { getSession } from "@/data/session/get";
import { getUserShippingAddresses } from "@/data/shipping-address/get";
import { getPriceTotalInCents } from "@/helpers/get-total-price-in-cents";

import CartSummary from "../components/cart-summary";
import UserShippingAddresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await getSession();
  if (!session || !session?.user) {
    redirect("/");
  }

  const cart = await getCartByUserId(session.user.id);
  if (!cart || !cart.items.length) {
    redirect("/");
  }

  const addresses = await getUserShippingAddresses(session.user.id);
  const cartTotalInCents = getPriceTotalInCents(cart);

  return (
    <div className="space-y-4 px-5">
      <UserShippingAddresses
        defaultShippingAddressId={cart.shippingAddressId}
        initialShippingAddresses={addresses}
      />

      {cart.items.map((cartItem) => (
        <CartSummary
          key={cartItem.id}
          totalInCents={cartTotalInCents}
          item={cartItem}
        />
      ))}
    </div>
  );
};

export default IdentificationPage;
