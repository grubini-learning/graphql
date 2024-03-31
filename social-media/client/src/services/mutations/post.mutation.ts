import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";

import { GraphClient } from "../";
import { Post } from "../../types";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      variables,
    }: {
      variables: {
        id: number;
        post: Partial<Pick<Post, "title" | "content" | "published">>;
      };
    }) => {
      return await GraphClient.getInstance().request(
        gql`
          mutation updatePost($id: ID!, $post: PostInput!) {
            postUpdate(id: $id, post: $post) {
              userErrors {
                message
              }
              post {
                id
                content
              }
            }
          }
        `,
        variables
      );
    },
    onSuccess(_data, _variables, _context) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
