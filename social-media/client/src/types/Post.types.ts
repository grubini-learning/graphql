import { User } from "./User.types";

export type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
  authorId?: number;
  user: Partial<User>;
};
