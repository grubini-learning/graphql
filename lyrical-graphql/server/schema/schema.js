const _ = require(".pnpm/lodash@4.17.21/node_modules/lodash");
const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQueryType = require("./root_query_type");
const mutations = require("./mutations");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
});
