import "server-only";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export interface SessionDto {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    image?: string | null | undefined | undefined;
  } | null;
}

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session as SessionDto;
};
