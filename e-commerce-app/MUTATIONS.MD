# Mutations

Any change or manipulation to data

## Main mutations

```graphql
type Mutation {
  addCategory(input: AddCategoryInput!): Category!
}

input AddCategoryInput {
  name: String!
}
```
