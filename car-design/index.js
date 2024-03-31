const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupDelete(groupId: ID!): GroupUpdatePayload
    groupPublish(groupId: ID!): GroupUpdatePayload
    groupUnpublish(groupId: ID!): GroupUpdatePayload
    groupAddCars(groupId: ID!, carId: [ID!]!): GroupUpdatePayload
    groupRemoveCars(groupId: ID!, carId: [ID!]!): GroupUpdatePayload
    groupCreate(groupInput: GroupInput!): GroupUpdatePayload
    groupUpdate(groupId: ID!, groupInput: GroupInput!): GroupUpdatePayload
  }

  input GroupInput {
    name: String
    mage: ImageInput
    description: String
    featureSet: GroupFeatureFields
  }

  input ImageInput {
    url: String!
  }

  type GroupUpdatePayload {
    userErrors: [UserErrors!]!
    group: Group
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String!
    image: Image!
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    featureSet: GroupFeatureSet
  }

  type GroupFeatureSet {
    features: [GroupFeature!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeature {
    feature: GroupFeatureFields!
  }

  type Image {
    id: ID!
    url: String!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
