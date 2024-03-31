import { Post } from "@prisma/client";

import { Context, DataTypes, Payload, PostArgs } from "../../types";
import { canUserMutatePost } from "../../utils";

export default {
  postCreate: (
    _: any,
    { post: { title, content } }: PostArgs,
    { prisma, userInfo }: Context
  ):
    | Promise<Payload<DataTypes.post, Post | null>>
    | Payload<DataTypes.post, null> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: "Forbidden access. Not authenticated" }],
        post: null,
      };
    }
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide a title and content to create a post.",
          },
        ],
        post: null,
      };
    }

    return prisma.post
      .create({
        data: {
          title: title!,
          content: content!,
          authorId: userInfo.userId,
        },
      })
      .then((post) => {
        return {
          userErrors: [],
          post,
        };
      })
      .catch((e) => {
        console.log(e);

        return {
          userErrors: [{ message: `Oops, post creation had an error` }],
          post: null,
        };
      });
  },
  postUpdate: async (
    _: any,
    { id = "-1", post: { title, content, published } }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<Payload<DataTypes.post, Post | null>> => {
    console.log("the ;post: ", { title, content, published });

    if (!userInfo) {
      return {
        userErrors: [{ message: "Forbidden access. Not authenticated" }],
        post: null,
      };
    }
    const userErrors = await canUserMutatePost({
      userId: userInfo.userId,
      postId: +id,
      prisma,
    });

    if (userErrors) {
      return {
        userErrors,
        post: null,
      };
    }

    if (!title && !content && published === undefined) {
      return {
        userErrors: [
          {
            message: "You must provide a valid field to update a Post",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
      published,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;
    if (published === undefined) delete payloadToUpdate.published;

    const post = await prisma.post.update({
      data: { ...payloadToUpdate },
      where: { id: Number(id!) },
    });

    return {
      userErrors: [],
      post: post,
    };
  },
  postDelete: async (
    _: any,
    { id }: { id: string },
    { prisma, userInfo }: Context
  ): Promise<Payload<DataTypes.post, Post | null>> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: "Forbidden access. Not authenticated" }],
        post: null,
      };
    }
    const userErrors = await canUserMutatePost({
      userId: userInfo.userId,
      postId: +id,
      prisma,
    });

    if (userErrors) {
      return {
        userErrors,
        post: null,
      };
    }

    return prisma.post
      .delete({ where: { id: +id } })
      .then((post) => {
        return {
          userErrors: [],
          post,
        };
      })
      .catch((e) => {
        console.log(e);

        return {
          userErrors: [
            { message: `User with id ${id} was not able to be deleted` },
            { message: e.meta.cause },
          ],
          post: null,
        };
      });
  },
};
