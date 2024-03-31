import { Post } from "@prisma/client";

export type PostArgs = {
  id?: string;
  post: Pick<Partial<Post>, "title" | "content" | "published">;
};
