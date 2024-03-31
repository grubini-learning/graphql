import { Post, User as PrismaUser, User as PUser } from "@prisma/client";
import { Context } from "../../types";

export default {
  users: (_: any, __: any, { prisma }: Context): Promise<PrismaUser[]> => {
    return prisma.user.findMany({ orderBy: { name: "desc" } });
  },
};

export const User = {
  profile: (parent: any, _: any, { prisma }: Context) => {
    return prisma.profile.findUnique({ where: { userId: parent.id } });
  },
  posts: (
    parent: PUser,
    _: any,
    { prisma, userInfo }: Context
  ): Promise<Post[]> => {
    const isPostsAuthor = userInfo?.userId === parent.id;
    let where: Partial<Post> = {
      authorId: parent.id,
      published: true,
    };

    if (isPostsAuthor) delete where.published;

    return prisma.post.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });
  },
};
