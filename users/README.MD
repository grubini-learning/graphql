## Express / GraphQL

1. create file `server.js`

```ts
import express from "express";
import { graphqlHTTP } from "express-graphql";

app.use(
  "graphql",
  graphqlHTTP({
    schema: UserSchema,
    graphiql: true,
  })
);

const app = express();

app.listen(4000, () => {
  console.log("Listening...");
});
```

```ts
// UserSchema resolve function

resolve(_parentValue, { id }) {
    return fetch(`http://localhost:3000/users/${id}`)
        .then((res) => res.json())
        .catch((e) => {
            throw new Error(`User with id ${id} does NOT exist`);
        });
}
```

## Naming a query

```graphql
query findUsers {
  company(id: "2") {
    name
    description
    users {
      firstName
      age
    }
  }
}
```

## Naming a result

```graphql
  apple: company(id: "2") {
    name,
    description,
    users {
      firstName,
      age
    }
  }
```

## query fragments

```graphql
query findUsers {
  apple: company(id: "2") {
    ...companyDetails
  }

  company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  name
  description
  users {
    firstName
    age
  }
}
```

## Mutation

```graphql
mutation {
  addUser(firstName: "Jed", age: 45, companyId: "2") {
    id
    firstName
    age
  }
}
```

### Tips

- If no information is found from a query, we get back null.
