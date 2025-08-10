import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

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

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: (shippingAddress, { eq }) =>
      eq(shippingAddress.userId, session.user.id),
    orderBy: (shippingAddress, { desc }) => [desc(shippingAddress.createdAt)],
  });
  const cartTotalInCents = cart?.items.reduce((acc, item) => {
    return (acc += item.productVariant.priceInCents * item.quantity);
  }, 0);

  return (
    <>
      <Header />

      <div className="space-y-4 px-5">
        <Addresses
          defaultShippingAddressId={cart?.shippingAddressId || null}
          initialShippingAddresses={shippingAddresses}
        />

        <CartSummary
          subtotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart?.items.map((item) => ({
            id: item.id,
            name: item.productVariant.product.name,
            priceInCents: item.productVariant.priceInCents,
            quantity: item.quantity,
            variantImageUrl: item.productVariant.imageUrl,
            variantName: item.productVariant.name,
          }))}
        />
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
};

export default IdentificationPage;
