import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/common/header";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cartTable, { eq }) => eq(cartTable.userId, session.user.id),
    with: { items: true },
  });
  if (!cart || !cart?.items.length) {
    redirect("/");
  }

  const shippingAddresses = await db.query.shippingAdressTable.findMany({
    where: (address, { eq }) => eq(address.userId, session.user.id),
  });

  return (
    <div>
      <Header />

      <div className="px-5">
        <Addresses shippingAddresses={shippingAddresses} />
      </div>
    </div>
  );
};

export default IdentificationPage;
