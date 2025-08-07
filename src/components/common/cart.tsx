"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

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

        <div className="space-y-4 px-5">
          {cartIsLoading && <p>Carregando carrinho...</p>}
          {cart?.items.map((item) => (
            <div key={item.id}>
              <CartItem
                key={item.id}
                id={item.id}
                productName={item.productVariant.product.name}
                quantity={item.quantity}
                variantImageUrl={item.productVariant.imageUrl}
                variantName={item.productVariant.name}
                variantPriceInCents={item.productVariant.priceInCents}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
