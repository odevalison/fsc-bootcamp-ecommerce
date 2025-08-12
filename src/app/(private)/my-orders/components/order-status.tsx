import { Badge } from "@/components/ui/badge";
import type { orderTable } from "@/db/schema";

interface OrderStatusProps {
  status: (typeof orderTable.$inferSelect)["status"];
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <>
      {status === "paid" && <Badge>Pedido pago</Badge>}
      {status === "canceled" && (
        <Badge variant="destructive">Pedido cancelado</Badge>
      )}
      {status === "pending" && (
        <Badge variant="secondary">Pagamento pendente</Badge>
      )}
    </>
  );
};

export default OrderStatus;
