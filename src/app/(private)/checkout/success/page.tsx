import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSession } from "@/data/session/get";

const CheckoutSuccessPage = async () => {
  const session = await getSession();
  if (!session || !session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-[calc(100dvh-220px)]">
      <Dialog defaultOpen>
        <DialogContent className="rounded-3xl text-center">
          <CardHeader>
            <Image
              src="/dialog-image.svg"
              alt="Pedido efetuado com sucesso!"
              width={250}
              height={230}
              className="mx-auto"
            />
          </CardHeader>

          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription>
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <Button size="lg" className="rounded-full">
              <Link href="/my-orders">Ver meus pedido</Link>
            </Button>

            <Button
              size="lg"
              className="rounded-full"
              variant="outline"
              asChild
            >
              <Link href="/">Página inicial</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutSuccessPage;
