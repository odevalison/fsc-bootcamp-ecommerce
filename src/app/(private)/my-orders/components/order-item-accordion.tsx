import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OrderDto } from "@/data/orders/get";

import { formatDate } from "../helpers/date";
import OrderItem from "./order-item";
import OrderStatus from "./order-status";
import OrderSummary from "./order-summary";

interface OrderItemAccordionProps {
  order: OrderDto;
}

const OrderItemAccordion = ({ order }: OrderItemAccordionProps) => {
  return (
    <Card key={order.id}>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value={order.id}>
            <AccordionTrigger>
              <div className="space-y-2">
                <CardTitle>Data do pedido</CardTitle>

                <div className="flex items-center gap-2">
                  <CardDescription>
                    {formatDate(order.createdAt)}
                  </CardDescription>

                  <OrderStatus status={order.status} />
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-6">
              <Separator />
              {order.items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
              <Separator />
              <OrderSummary
                subtotalInCents={order.totalPriceInCents}
                totalInCents={order.totalPriceInCents}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default OrderItemAccordion;
