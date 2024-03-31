const graphQL = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphQL;

// Choose the fields that can be exposed to everyone else
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = UserType;
