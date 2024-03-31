import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../index";

type BatchUser = (ids: number[]) => Promise<User[]>;
type UserMap = { [key: string]: User };

const batchUsers: BatchUser = async (ids: number[]) => {
  const users = await prisma.user.findMany({ where: { id: { in: ids } } });
  const userMap: UserMap = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

//@ts-ignore
// Explain why ignored
export const userLoader = new DataLoader<number, User>(batchUsers);
