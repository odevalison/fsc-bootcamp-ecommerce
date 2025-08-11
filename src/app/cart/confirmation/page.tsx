import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  return session;
};

const getCart = async (session: Awaited<ReturnType<typeof getSession>>) => {
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || !cart.items.length) {
    redirect("/");
  }

  return cart;
};

const getTotalInCents = (cart: Awaited<ReturnType<typeof getCart>>) => {
  return cart.items.reduce((acc, item) => {
    return (acc += item.productVariant.priceInCents * item.quantity);
  }, 0);
};

const ConfirmationPage = async () => {
  const session = await getSession();

  const cart = await getCart(session);
  const totalInCents = getTotalInCents(cart);

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <>
      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent>
                <p className="text-sm font-medium">
                  {formatAddress(cart?.shippingAddress)}
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
    </>
  );
};

export default ConfirmationPage;
