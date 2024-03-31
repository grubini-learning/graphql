import { Prisma } from "@prisma/client";

export type UserArgs = {
  id?: string;
  user: Pick<
    Partial<Prisma.UserCreateInput>,
    "name" | "email" | "password" | "profile"
  >;
};
