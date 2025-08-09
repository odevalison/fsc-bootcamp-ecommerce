"use client";

import { ShoppingCart } from "lucide-react";

import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-6">
                {cartIsLoading && <p>Carregando carrinho...</p>}

                {cart?.items.map((item) => (
                  <div key={item.id}>
                    <CartItem
                      key={item.id}
                      cartItemId={item.id}
                      productName={item.productVariant.product.name}
                      variantId={item.productVariantId}
                      variantImageUrl={item.productVariant.imageUrl}
                      variantName={item.productVariant.name}
                      variantPriceInCents={item.productVariant.priceInCents}
                      quantity={item.quantity}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {!!cart?.items.length && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button size="lg" className="mt-5 rounded-full">
                Finalizar compra
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
