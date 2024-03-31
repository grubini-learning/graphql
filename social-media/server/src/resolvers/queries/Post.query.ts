import { Post as PPost, User } from "@prisma/client";

import { userLoader } from "../../loaders";
import { Context } from "../../types";

export default {
  posts: (_: any, __: any, { prisma }: Context): Promise<PPost[]> => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: [{ createdAt: "desc" }],
    });
  },
};

export const Post = {
  user: (parent: PPost, _: any, __: any): Promise<User | null> => {
    return userLoader.load(parent.authorId);
  },
};
