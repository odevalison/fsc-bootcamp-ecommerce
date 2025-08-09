"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

import NewAddressForm from "./new-address-form";

const Address = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: userAddresses, isPending } = useShippingAddresses();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {isPending && <p>Buscando endereços...</p>}
        {userAddresses &&
          userAddresses.map((address) => (
            <RadioGroup
              key={address.id}
              value={selectedAddress}
              onValueChange={setSelectedAddress}
            >
              <Card>
                <CardContent>
                  <div className="flex items-center space-x-6">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label htmlFor={address.id}>
                      {address.recipientName} - {address.street},{" "}
                      {address.number}, {address.complement},{" "}
                      {address.neighborhood}, {address.city} - {address.state},
                      CEP - {address.zipCode}
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

        {selectedAddress === "add_new" && (
          <>
            <Separator className="my-6" />

            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-semibold">Adicionar novo</h2>
              <NewAddressForm />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Address;
