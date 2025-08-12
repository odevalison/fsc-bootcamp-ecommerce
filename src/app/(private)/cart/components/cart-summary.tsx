import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartItemDto } from "@/data/cart/get";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  totalInCents: number;
  item: CartItemDto;
}

const CartSummary = ({ totalInCents, item }: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu pedido</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-muted-foreground text-sm">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Frete</p>
            <p className="text-muted-foreground text-sm">Grátis</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">Total</p>
            <p className="text-muted-foreground text-sm">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>
        </div>

        <Separator className="my-11" />

        <div className="divide-accent space-y-4 divide-y-[1.5px]">
          <div className="flex w-full items-center justify-between pb-4">
            <div className="flex items-center gap-4">
              <Image
                width={70}
                height={70}
                src={item.productVariant.imageUrl}
                alt={item.productVariant.product.name}
                className="rounded-lg"
              />

              <div className="flex flex-col items-start gap-1">
                <p className="text-xs font-semibold">
                  {item.productVariant.product.name}
                </p>

                <p className="text-muted-foreground text-xs font-medium">
                  {item.productVariant.name} | {item.quantity}x
                </p>

                <p className="text-sm font-semibold">
                  {formatCentsToBRL(
                    item.productVariant.priceInCents * item.quantity,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
