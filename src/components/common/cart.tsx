"use client";

import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBagIcon className="text-muted-foreground size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="rounded-tl-3xl rounded-bl-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBagIcon className="text-muted-foreground size-5" /> Sacola
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-6">
                {!!cart?.items.length &&
                  cart?.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}

                {!cart?.items.length && (
                  <p className="text-muted-foreground text-sm font-medium">
                    Seu carrinho está vazio.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          {(cart?.items?.length as number) > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <SheetClose asChild>
                <Button size="lg" className="mt-4 rounded-full" asChild>
                  <Link href="/cart/identification">Finalizar compra</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  variant="link"
                  className="text-accent-foreground font-medium"
                >
                  Continuar comprando
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
