module.exports = {
  hello: (_parentValue, _args, _ctx) => {
    return "Hello World";
  },
  products: (_parent, { filter }, { db }) => {
    let productsToFilter = db.products;

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
  product: (_parentValue, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  category: (_parentValue, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
  categories: (_parent, _args, { db }) => {
    return db.categories;
  },
};
