import { gql } from "apollo-server";

export default gql`
  type Query {
    posts: [Post!]!
    users: [User!]!
    profile(userId: ID!): ProfilePayload!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(id: ID!, post: PostInput!): PostPayload!
    postDelete(id: ID!): PostPayload!
    signUp(user: UserInput!): UserPayload!
    signIn(email: String!, password: String!): UserPayload!
  }

  input PostInput {
    title: String
    content: String
    published: Boolean
  }

  input UserInput {
    name: String
    email: String
    password: String
    profile: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    profile: Profile!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserError {
    message: String!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type UserPayload {
    userErrors: [UserError!]!
    id: ID
    token: String
  }

  type ProfilePayload {
    userErrors: [UserError!]!
    profile: Profile
    isMyProfile: Boolean!
  }
`;
