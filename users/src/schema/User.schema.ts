import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import axios from "axios";

import { CompanyType } from ".";

export const UserType: any = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      // args: { id: { type: GraphQLID } },
      resolve({ companyId }, args) {
        return axios
          .get(`http://localhost:3000/companies/${companyId}`)
          .then((res) => res.data)
          .catch((e) => {
            throw new Error("The company provided does not exist");
          });
      },
    },
  }),
});
