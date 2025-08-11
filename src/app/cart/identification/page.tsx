import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

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
  if (!cart || !cart?.items.length) {
    redirect("/");
  }

  return cart;
};

const getUserAddresses = async () => {
  const session = await getSession();

  return await db.query.shippingAddressTable.findMany({
    where: (shippingAddress, { eq }) =>
      eq(shippingAddress.userId, session.user.id),
    orderBy: (shippingAddress, { desc }) => [desc(shippingAddress.createdAt)],
  });
};

const getTotalInCents = (cart: Awaited<ReturnType<typeof getCart>>) => {
  return cart.items.reduce((acc, item) => {
    return (acc += item.productVariant.priceInCents * item.quantity);
  }, 0);
};

const IdentificationPage = async () => {
  const session = await getSession();

  const cart = await getCart(session);
  const addresses = await getUserAddresses();
  const cartTotalInCents = getTotalInCents(cart);

  return (
    <div className="space-y-4 px-5">
      <Addresses
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
