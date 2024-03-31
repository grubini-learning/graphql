import { GraphQLSchema } from "graphql";
import { RootQuery } from "./Root.query";
import { RootMutation } from "./Mutation.query";

export const UserSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
