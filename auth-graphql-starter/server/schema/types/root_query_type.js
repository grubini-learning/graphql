const graphql = require("graphql");
const UserType = require("./user_type");
const { GraphQLObjectType } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      resolve(_parentValue, _args, req) {
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
