import { Post } from ".";

export type User = {
  id: number;
  email: string;
  name: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
  profile: string;
};
