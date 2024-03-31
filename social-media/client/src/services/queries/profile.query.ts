import { gql } from "graphql-request";
import { useQuery } from "react-query";

import { GraphClient } from "..";

export const useGetProfile = (id: number) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await GraphClient.getInstance().request(
        gql`
          query getProfile($id: ID!) {
            profile(userId: $id) {
              userErrors {
                message
              }
              profile {
                bio
                user {
                  name
                  posts {
                    id
                    title
                    content
                    createdAt
                    published
                  }
                }
              }
              isMyProfile
            }
          }
        `,
        { id }
      );
    },
  });
};
