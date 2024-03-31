import gql from "graphql-tag";

export const logOut = gql`
  mutation {
    logOut {
      id
      email
    }
  }
`;
