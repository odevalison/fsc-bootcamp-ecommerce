import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddShippingAddress } from "@/hooks/mutations/use-add-shipping-address";

const newAddressFormSchema = z.object({
  email: z.email("Email inválido").trim().min(1, "Email obrigatório."),
  recipientName: z.string().trim().min(1, "Nome é obrigatório."),
  cpfOrCnpj: z.string().trim().min(1, "CPF/CNPJ obrigatórios."),
  phone: z.string().trim().min(1, "Celular é obrigatório"),
  zipCode: z.string().trim().min(1, "CEP é obrigatório"),
  street: z.string().trim().min(1, "Endereço é obrigatório."),
  number: z.string().trim().min(1, "Número é obrigatório."),
  complement: z.string(),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório."),
  city: z.string().trim().min(1, "Cidade é obrigatória"),
  state: z.string().trim().min(1, "Estado é obrigatório."),
});

type NewAddressFormSchema = z.infer<typeof newAddressFormSchema>;

const NewAddressForm = () => {
  const form = useForm<NewAddressFormSchema>({
    resolver: zodResolver(newAddressFormSchema),
    mode: "onSubmit",
    defaultValues: {
      street: "",
      city: "",
      complement: "",
      cpfOrCnpj: "",
      email: "",
      neighborhood: "",
      number: "",
      phone: "",
      recipientName: "",
      state: "",
      zipCode: "",
    },
  });

  const addNewShippingAddressMutation = useAddShippingAddress();

  const onSubmit = (data: NewAddressFormSchema) => {
    addNewShippingAddressMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Endereço adicionado com sucesso.");
        form.reset();
      },
      onError: () => {
        toast.error("Erro ao adicionar endereço.");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Email" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Nome completo" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Celular" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="cpfOrCnpj"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="CPF/CNPJ" />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="CEP" />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Endereço" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Número" />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Complemento" />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Bairro" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Cidade" />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Estado" />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={addNewShippingAddressMutation.isPending}
          size="lg"
          className="flex w-full items-center justify-center rounded-full"
        >
          {addNewShippingAddressMutation.isPending && (
            <Loader2 className="size-5 animate-spin" />
          )}
          Continuar com o pagamento
        </Button>
      </form>
    </Form>
  );
};

export default NewAddressForm;
