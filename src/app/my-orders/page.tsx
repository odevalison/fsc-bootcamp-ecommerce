import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import OrderItem from "./components/order-item";
import OrderSummary from "./components/order-summary";

const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  return session;
};

const getOrders = async (session: Awaited<ReturnType<typeof getSession>>) => {
  return await db.query.orderTable.findMany({
    where: (orders, { eq }) => eq(orders.userId, session.user.id),
    with: {
      items: {
        with: { productVariant: { with: { product: true } } },
      },
    },
  });
};

const MyOrdersPage = async () => {
  const session = await getSession();
  const orders = await getOrders(session);

  return (
    <>
      <div className="space-y-6 px-5">
        <h1 className="text-lg font-semibold">Meus pedidos</h1>

        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="afas">
                  <AccordionTrigger>
                    <div className="space-y-2">
                      <CardTitle>Data do pedido</CardTitle>

                      <div className="flex items-center gap-2">
                        <CardDescription>
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                          )}
                        </CardDescription>

                        <Badge variant="outline">
                          {(order.status === "paid" && "Pago") ||
                            (order.status === "canceled" &&
                              "Pedido cancelado") ||
                            (order.status === "pending" && "Pendente")}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="flex flex-col gap-6">
                    <Separator />

                    {order.items.map((item) => (
                      <OrderItem
                        key={item.id}
                        item={{
                          id: item.id,
                          productName: item.productVariant.product.name,
                          quantity: item.quantity,
                          variantImageUrl: item.productVariant.imageUrl,
                          variantName: item.productVariant.name,
                          variantPriceInCents: item.productVariant.priceInCents,
                        }}
                      />
                    ))}

                    <Separator />

                    <OrderSummary
                      orderSubtotalInCents={order.totalPriceInCents}
                      orderTotalInCents={order.totalPriceInCents}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MyOrdersPage;
