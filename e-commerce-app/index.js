const { ApolloServer } = require("apollo-server");

const { db } = require("./db");
const typeDefs = require("./schema");
const { Query, Product, Category, Mutation } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
    Mutation,
  },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log("Server is ready at ", url);
});
