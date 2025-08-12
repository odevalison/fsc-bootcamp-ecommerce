"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();

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
  };

  return (
    <Button
      disabled={finishOrderMutation.isPending}
      onClick={handleFinishOrder}
      size="lg"
      className="flex w-full items-center justify-center rounded-full"
    >
      {finishOrderMutation.isPending && <Loader2 className="animate-spin" />}
      Finalizar a compra
    </Button>
  );
};

export default FinishOrderButton;
