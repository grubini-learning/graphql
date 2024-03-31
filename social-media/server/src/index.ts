import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import { getUserFromToken } from "./utils";
import { Context } from "./types";

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any): Context => {
    const userInfo = getUserFromToken(req.headers.authorization);

    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
});
