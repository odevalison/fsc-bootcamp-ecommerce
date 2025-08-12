"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { ShippingAddressDto } from "@/data/shipping-address/get";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

import { formatAddress } from "../../helpers/address";
import AddShippingAddressForm from "./add-shipping-address-form";

interface UserShippingAddressesProps {
  defaultShippingAddressId: string | null;
  initialShippingAddresses: ShippingAddressDto[];
}

const UserShippingAddresses = ({
  defaultShippingAddressId,
  initialShippingAddresses,
}: UserShippingAddressesProps) => {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState(
    defaultShippingAddressId,
  );

  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const { data: shippingAddresses } = useShippingAddresses({
    initialData: initialShippingAddresses,
  });

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new") {
      return;
    }

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });

      router.push("/cart/confirmation");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao finalizar compra, tente novamente.");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {shippingAddresses?.map((shippingAddress) => (
          <RadioGroup
            key={shippingAddress.id}
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            <Card>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <RadioGroupItem
                    value={shippingAddress.id}
                    id={shippingAddress.id}
                  />
                  <Label htmlFor={shippingAddress.id}>
                    {formatAddress(shippingAddress)}
                  </Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        ))}

        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-6">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress !== "add_new" && (
          <Button
            disabled={updateCartShippingAddressMutation.isPending}
            onClick={handleGoToPayment}
            size="lg"
            className="flex w-full items-center justify-center rounded-full"
          >
            {updateCartShippingAddressMutation.isPending && (
              <Loader2 className="animtate-spin size-4" />
            )}
            Finalizar a compra
          </Button>
        )}

        {selectedAddress === "add_new" && (
          <>
            <Separator className="my-6" />

            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-semibold">Adicionar novo</h2>

              <AddShippingAddressForm />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserShippingAddresses;
