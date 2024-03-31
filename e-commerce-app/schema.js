const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    category(id: ID!): Category
    categories: [Category!]!
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    updateReview(id: ID!, input: UpdateReviewInput!): Review!
  }

  type Review {
    id: ID!
    date: String!
    comment: String!
    productId: ID!
    rating: Int!
    title: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
    # average: Int
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  input ProductsFilterInput {
    onSale: Boolean
    averageRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: ID!
  }

  input AddReviewInput {
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input UpdateProductInput {
    name: String
    description: String
    quantity: Int
    price: Float
    image: String
    onSale: Boolean
    categoryId: ID
  }
  input UpdateCategoryInput {
    name: String!
  }
  input UpdateReviewInput {
    title: String
    comment: String
    rating: Int
    productId: ID!
  }
`;
