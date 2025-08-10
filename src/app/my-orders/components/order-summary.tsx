import { formatCentsToBRL } from "@/helpers/money";

interface OrderSummaryProps {
  orderTotalInCents: number;
  orderSubtotalInCents: number;
}

const OrderSummary = ({
  orderSubtotalInCents,
  orderTotalInCents,
}: OrderSummaryProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Subtotal</p>
        <p className="text-muted-foreground text-sm font-medium">
          {formatCentsToBRL(orderSubtotalInCents)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Transporte e Manuseio</p>
        <p className="text-muted-foreground text-sm font-medium">Grátis</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Taxa Estimada</p>
        <p className="text-muted-foreground text-sm font-medium">-</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Total</p>
        <p className="text-sm font-semibold">
          {formatCentsToBRL(orderTotalInCents)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
