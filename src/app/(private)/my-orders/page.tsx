import { redirect } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { getOrders } from "@/data/orders/get";
import { getSession } from "@/data/session/get";

import OrderItemAccordion from "./components/order-item-accordion";

const MyOrdersPage = async () => {
  const session = await getSession();
  if (!session || !session?.user) {
    redirect("/");
  }

  const orders = await getOrders(session);

  return (
    <div className="min-h-[calc(100dvh-220px)] space-y-6 px-5">
      <h1 className="text-lg font-semibold">Meus pedidos</h1>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <OrderItemAccordion order={order} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyOrdersPage;
