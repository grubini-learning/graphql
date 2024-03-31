import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const enum DataTypes {
  post = "post",
  user = "user",
  token = "token",
}

export const enum ErrorCodes {
  NOT_UNIQUE = "P2002",
}

export type UserErrors = { message: string };

export type Payload<Key extends string, T> = {
  userErrors: UserErrors[];
} & Record<Key, T>;

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: { userId: number } | null;
};
