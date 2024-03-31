# GraphQL

## Why does it exist?

To overcome the shortcoming of RESTFUL conventions

## What is it?

GraphQl is a query that can travel through a Data structure that contains `nodes` and relations that are known as `edges`

## What is it v2?

A query language for reading and mutating data in APIs

## What GraphQL solves

- under fetching
  - routing with highly relational data gets complicated
- over fetching

## Structure

- Schema: Provides a type system where for the data to be described
  - Entry point:
    - Query
    - Mutations
  - Type: using the "type" keyword we start to describe the shape of our data nd relationships
  - Inputs: using keyword "input" we can describe the shape of data that we want for parameters for a specific query or mutation
- Resolvers: function that resolves Object fields that can be seen in our types.
  - each resolvers gets access to:
    - parent: the type that our inner object is located in
    - args: arguments passed in to the query or mutation
    - ctx: whatever we pass in through the client at the time of initializing our server.
- DataLoaders
  - batching
  - caching

## Javascript GraphQL Clients

- Lokka
  - easy, basic queries and mutations.
  - basic caching.
- Apollo (stack)
  - backend server
  - client
    - good balance between features and complexity
- Relay

  - Used by facebook
  - Most complex
  - Amazing performance in mobile.

  _Every sub folder contains MD files that contains learning content for the project that contains it_

  ## Sub Folders

  1.  `e-commerce-app`, in this project you can find:

      - About mutations
      - About queries
      - About inputs
      - About types
      - About parameters
      - About what `(parent, args, ctx)` is
      - How to provide ctx to your resolvers

      * ### Description

            Product e-commerce graphQL API that allows you to:

        - query for products
        - filter for products
          - products on sale
          - products with a review average
        - CRUD operations for products
        - CRUD operations for categories
        - CRUD operations for reviews
        - Resolve nested object fields

  2.  `auth-graphql-starter`, in this project you can find:

      - GraphQL set up with

        - express
        - apollo client
        - graphQL express
        - React
        - webpack
        - Passport.js

      * ### Description

            User application that allows to authenticate and perform a user sign up, sign in, and log out. This also responds correctly in the client side with `react-apollo` and `apollo-client`.

  3.  `car-design`, in this project you can find:

      - Shopify API design learnings
      - The use of enums for finite possible values

  4.  `social-media`, in this project you can find:

      - Typescript
      - Authentication
      - Real DB
        - Supabase with Postgres
        - Prisma ORM
      - Performance
      - Interacting with a client
