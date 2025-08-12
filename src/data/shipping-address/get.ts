import { db } from "@/db";

export interface ShippingAddressDto {
  number: string;
  id: string;
  email: string;
  createdAt: Date;
  userId: string;
  recipientName: string;
  cpfOrCnpj: string;
  street: string;
  complement: string | null;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
  country: string;
  phone: string;
}

export const getUserShippingAddresses = async (userId: string) => {
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: (shippingAddress, { eq }) => eq(shippingAddress.userId, userId),
    orderBy: (shippingAddress, { desc }) => [desc(shippingAddress.createdAt)],
  });

  return shippingAddresses as ShippingAddressDto[];
};
