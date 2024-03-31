import { GraphQLID, GraphQLObjectType } from "graphql";
import axios from "axios";

import { CompanyType, UserType } from "../schema";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/users/${id}`)
          .then((res) => res.data)
          .catch((e) => {
            throw new Error(`User with id ${id} does NOT exist`);
          });
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/companies/${id}`)
          .then((res) => res.data)
          .catch((e) => {
            throw new Error(`Company with id ${id} does NOT exist`);
          });
      },
    },
  }),
});
