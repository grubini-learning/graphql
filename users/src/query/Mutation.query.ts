import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import axios from "axios";

import { UserType } from "../schema";

export const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLID },
      },
      resolve(_parentValue, args) {
        console.log("there are the args: ", args);

        return axios
          .post(`http://localhost:3000/users`, { ...args })
          .then((res) => res.data)
          .catch((e) => {
            console.log("error: ", e);

            throw new Error(`The user ${args.firstName}, was not created`);
          });
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(_parentValue, { id, firstName, age }) {
        return axios
          .patch(`http://localhost:3000/users/${id}`, {
            firstName,
            age,
          })
          .then((res) => res.data)
          .catch((e) => {
            throw new Error("There was an error with this update");
          });
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/users/${id}`)
          .then((res) => res.data)
          .then(() => true)
          .catch((_e) => false);
      },
    },
  },
});
