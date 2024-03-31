# Definitions

## What is it?

A query language for reading and mutating data in APIs

## What GRaphQL solves

- under fetching
- over fetching
- routing with highly relational data gets complicated

## Structure

- Single entry point:
  - Query
  - Mutations
- Schema: Provides a type system where a schema for the data is described
  - Type: using the "type" keyword we start to describe the shape of our data nd relationships
  - Inputs: using keyword "input" we can describe the shape of data that we want for parameters for a specific query or mutation
- Resolvers: function that resolves Object fields that can be seen in our types.
  - each resolvers gets access to:
    - parent: the type that our inner object is located in
    - args: arguments passed in to the query or mutation
    - ctx: whatever we pass in through the client at the time of initializing our server.

## GraphiQL

Developer environment that auto documents your schema and the possible Queries and Mutations allowed, along with their return types.

## Type defs

```graphql
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
```

## Resolver

Functions that return data as we specify it in the schema.
_name of the resolvers have to match with the name of the properties in the type defs for GraphQL to know what we are talking about._

```graphql
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
  },
};
```

## Scalar types

- String
- Int
- Float
- Boolean
- ID

## Object types

- Arrays

```graphql
const typeDefs = gql`
  type Query {
    hello: [String]
  }
`;

const resolvers = {
  hello: () => {
    return ["Hello", null, "World"];
  },
};
```

### Pass needed data through context

We pass data needed through the context in graphQL and cab found in every resolver in our app.

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
  },
  context: {
    products,
    categories,
    reviews,
  },
});
```

## File Structure

- schema.js
- resolvers
  - ...
  - ...
