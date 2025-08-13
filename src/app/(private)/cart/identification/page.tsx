import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCartByUserId } from "@/data/cart/get";
import { getSession } from "@/data/session/get";
import { getUserShippingAddresses } from "@/data/shipping-address/get";
import { getPriceTotalInCents } from "@/helpers/get-total-price-in-cents";
import { formatCentsToBRL } from "@/helpers/money";

import CartItemSummary from "../components/cart-summary";
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

      <Card>
        <CardHeader>
          <CardTitle>Seu pedido</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm">Subtotal</p>
              <p className="text-muted-foreground text-sm">
                {formatCentsToBRL(cartTotalInCents)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm">Frete</p>
              <p className="text-muted-foreground text-sm">Grátis</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm">Total</p>
              <p className="text-muted-foreground text-sm">
                {formatCentsToBRL(cartTotalInCents)}
              </p>
            </div>
          </div>

          <Separator className="my-11" />

          {cart.items.map((cartItem) => (
            <CartItemSummary key={cartItem.id} item={cartItem} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentificationPage;
