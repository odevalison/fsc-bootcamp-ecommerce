"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOut,
  MenuIcon,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";

import type { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface MenuProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const Menu = ({ categories }: MenuProps) => {
  const { data: session } = authClient.useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="text-muted-foreground size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          {session?.user ? (
            <>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={session.user.image as string | undefined}
                    />

                    <AvatarFallback>
                      {session.user.name.split(" ")?.[0]?.[0]}
                      {session.user.name.split(" ")?.[1]?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-semibold">{session.user.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-5">
                  <SheetClose asChild>
                    <Link
                      className="flex items-center gap-3 text-sm font-medium hover:underline"
                      href="/"
                    >
                      <HomeIcon className="size-5" />
                      Início
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      className="flex items-center gap-3 text-sm font-medium hover:underline"
                      href="/my-orders"
                    >
                      <Truck className="size-5" />
                      Meus Pedidos
                    </Link>
                  </SheetClose>

                  <SheetClose>
                    <Link
                      className="flex items-center gap-3 text-sm font-medium hover:underline"
                      href="/cart/identification"
                    >
                      <ShoppingBag className="size-5" />
                      Sacola
                    </Link>
                  </SheetClose>
                </div>

                <Separator />

                <div className="flex flex-col items-start space-y-5">
                  {categories.map((category) => (
                    <SheetClose
                      key={category.id}
                      asChild
                      className="text-sm font-medium text-black hover:underline"
                    >
                      <Link href={`/category/${category.slug}`}>
                        {category.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <Separator />

                <Button
                  variant="ghost"
                  className="text-muted-foreground space-x-3 text-sm font-medium"
                >
                  <LogOut className="size-4" />
                  Sair da conta
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá, faça seu login!</h2>

                <Button
                  asChild
                  size="lg"
                  className="flex items-center gap-3 rounded-full text-sm font-medium"
                >
                  <Link
                    className="flex items-center gap-3 font-medium"
                    href="/authentication"
                  >
                    Login
                    <LogInIcon />
                  </Link>
                </Button>
              </div>

              <Separator />

              <div className="space-y-5">
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-3 text-sm font-medium hover:underline"
                    href="/"
                  >
                    <HomeIcon className="size-5" />
                    Início
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-3 text-sm font-medium hover:underline"
                    href="/my-orders"
                  >
                    <Truck className="size-5" />
                    Meus Pedidos
                  </Link>
                </SheetClose>

                <SheetClose>
                  <Link
                    className="flex items-center gap-3 text-sm font-medium hover:underline"
                    href="/cart/identification"
                  >
                    <ShoppingBag className="size-5" />
                    Sacola
                  </Link>
                </SheetClose>
              </div>

              <Separator />

              <div className="flex flex-col items-start space-y-5">
                {categories.map((category) => (
                  <SheetClose
                    key={category.id}
                    asChild
                    className="text-sm font-medium text-black hover:underline"
                  >
                    <Link href={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
