import Image from "next/image";
import Link from "next/link";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessPage = () => {
  return (
    <>
      <Dialog open={true}>
        <DialogContent className="text-center">
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
    </>
  );
};

export default CheckoutSuccessPage;
