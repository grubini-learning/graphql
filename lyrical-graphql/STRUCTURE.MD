# Structure

## Schema

Informs GraphQL how data in our app is arranged, its relationships and how it can be accessed through a schema file.

```ts
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});
```

## RootQuery

Entry point in our data that allows us to jump in our graph of data.

### anatomy:

- fields
  - the type of data that it can return
  - **args**, the arguments that will be passed to the resolve fn
  - the **resolve** function to get the desired return type

```ts
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {},
    },
  },
});
```
