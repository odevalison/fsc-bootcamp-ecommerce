import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
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

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAdress: true,
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

  const cartTotalInCents = cart?.items.reduce((acc, item) => {
    return (acc += item.productVariant.priceInCents * item.quantity);
  }, 0);

  if (!cart?.shippingAdress) {
    redirect("/cart/identification");
  }

  return (
    <>
      <Header />

      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent>
                <p className="text-sm font-medium">
                  {formatAddress(cart.shippingAdress)}
                </p>
              </CardContent>
            </Card>
          </CardContent>

          <CardFooter>
            <Button size="lg" className="w-full rounded-full">
              Finalizar a compra
            </Button>
          </CardFooter>
        </Card>

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

export default ConfirmationPage;
