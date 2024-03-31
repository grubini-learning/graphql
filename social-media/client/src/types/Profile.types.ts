import { User } from "./User.types";

export type Profile = {
  id: number;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: Partial<User>;
};
