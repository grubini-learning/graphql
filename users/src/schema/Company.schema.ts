import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import axios from "axios";

import { UserType } from ".";

export const CompanyType: any = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve({ id }, args) {
        return axios
          .get(`http://localhost:3000/companies/${id}?_embed=users`)
          .then((res) => res.data)
          .then((data) => data["users"]);
      },
    },
  }),
});
