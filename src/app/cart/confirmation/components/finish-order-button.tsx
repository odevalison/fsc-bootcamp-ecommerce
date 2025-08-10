"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);

  const handleFinishOrder = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key is not set");
    }

    const { orderId } = await finishOrderMutation.mutateAsync();
    const checkoutSession = await createCheckoutSession({ orderId });

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }

    await stripe.redirectToCheckout({ sessionId: checkoutSession.id });

    setSuccessDialogIsOpen(true);
  };

  return (
    <>
      <Button
        disabled={finishOrderMutation.isPending}
        onClick={handleFinishOrder}
        size="lg"
        className="flex w-full items-center justify-center rounded-full"
      >
        {finishOrderMutation.isPending && <Loader2 className="animate-spin" />}
        Finalizar a compra
      </Button>

      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
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
              Ver meus pedido
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

export default FinishOrderButton;
