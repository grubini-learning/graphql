import { Context, UserErrors } from "../types";

interface PostMutateParams {
  userId: number;
  postId: number;
  prisma: Context["prisma"];
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: PostMutateParams): Promise<UserErrors[] | null> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return [{ message: "User not found" }];
  }

  const post = await prisma.post.findUnique({
    where: { id: postId, authorId: user!.id },
  });

  if (!post) {
    return [{ message: "User is not allowed to edit this post" }];
  }

  return null;
};
