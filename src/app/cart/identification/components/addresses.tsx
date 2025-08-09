"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import NewAddressForm from "./new-address-form";

const Address = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-6">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label>Adicionar novo</Label>
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
