import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { GraphClient } from "..";
import { Payload, Post } from "../../types";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Payload<"posts", Post[]>> => {
      return await GraphClient.getInstance().request(gql`
        query {
          posts {
            id
            title
            content
            createdAt
            user {
              name
            }
          }
        }
      `);
    },
  });
};
