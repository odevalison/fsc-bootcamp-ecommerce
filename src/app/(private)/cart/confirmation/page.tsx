import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCartByUserId } from "@/data/cart/get";
import { getSession } from "@/data/session/get";
import { getPriceTotalInCents } from "@/helpers/get-total-price-in-cents";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const session = await getSession();
  if (!session || !session?.user) {
    redirect("/");
  }

  const cart = await getCartByUserId(session.user.id);
  if (!cart || !cart.items.length) {
    redirect("/");
  } else if (!cart.shippingAddress) {
    redirect("/cart/shipping-address");
  }

  const totalInCents = getPriceTotalInCents(cart);

  return (
    <div className="space-y-4 px-5">
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardContent>
              <p className="text-sm font-medium">
                {formatAddress(cart.shippingAddress)}
              </p>
            </CardContent>
          </Card>
        </CardContent>

        <CardFooter>
          <FinishOrderButton />
        </CardFooter>
      </Card>

      {cart.items.map((cartItem) => (
        <CartSummary
          key={cartItem.id}
          item={cartItem}
          totalInCents={totalInCents}
        />
      ))}
    </div>
  );
};

export default ConfirmationPage;
