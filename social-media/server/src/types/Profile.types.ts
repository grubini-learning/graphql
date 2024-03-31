import { Prisma } from "@prisma/client";

export type Profile = {
  id: number;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user?: Partial<Prisma.UserCreateInput>;
};
