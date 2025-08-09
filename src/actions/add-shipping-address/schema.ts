import z from "zod";

export const addShippingAddressSchema = z.object({
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

export type AddShippingAddressSchema = z.infer<typeof addShippingAddressSchema>;
