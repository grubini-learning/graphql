const graphQL = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphQL;
const UserType = require("./types/user_type");
const { signup, login } = require("../services/auth");

// describes mutation actions, return types, arguments for the resolver, request object coming from express
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signUp: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_parentValue, { email, password }, req) {
        return signup({ email, password, req });
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_parentValue, { email, password }, req) {
        return login({ email, password, req });
      },
    },
    logOut: {
      type: UserType,
      resolve(_parentValue, _args, req) {
        const { user } = req;
        req.logout();
        return user;
      },
    },
  },
});

module.exports = mutation;
