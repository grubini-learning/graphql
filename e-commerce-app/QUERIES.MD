# Queries

## Parameters in queries

In the type def of the possible query and its resolver

```graphql
    product(id: ID!): Product

    product: (_parentValue, { id }, _ctx) => {
      return products.find((product) => product.id === id);
    },
```

## Associate collections

### Data

```json
{
  "id": "47bf3941-9c8b-42c0-9c72-7f3985492a5b",
  "name": "Soccer Ball",
  "description": "Round ball",
  "quantity": 734,
  "price": 93.44,
  "image": "img-9",
  "onSale": false,
  "categoryId": "d914aec0-25b2-4103-9ed8-225d39018d1d"
}
```

### Type

```graphql
type Category {
  id: ID!
  name: String!
  products: [Product!]!
}
```

### Resolver

```graphql
Query: {
    ...
},
  Category: {
    products: ({ id }, args, ctx) => {
      return products.filter((product) => product.categoryId === id);
    },
  },
```

## Pass inputs

```graphql
type Category {
  id: ID!
  name: String!
  products(filter: ProductsFilterInput): [Product!]!
}

input ProductsFilterInput {
  onSale: Boolean
  averageRating: Int
}

query {
  category(id: "d914aec0-25b2-4103-9ed8-225d39018d1d") {
    name
    products(filter: { onSale: true }) {
      name
      onSale
    }
  }
}
```

```javascript
products: (_parent, { filter }, { products, reviews }) => {
    let productsToFilter = products;

    if (filter) {
      const { onSale, averageRating } = filter;

      if (onSale) {
        productsToFilter = productsToFilter.filter((product) => product.onSale);
      }

      if (averageRating) {
        productsToFilter = productsToFilter.filter((product) => {
          let numberOfReviews = 0;
          const avg =
            reviews.reduce((total, current) => {
              if (current.productId === product.id) {
                numberOfReviews++;
                return total + current.rating;
              }

              return total;
            }, 0) / numberOfReviews;
          return avg >= averageRating;
        });
      }
    }

    return productsToFilter;
  },
```
