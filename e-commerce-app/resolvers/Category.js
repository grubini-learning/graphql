module.exports = {
  products: ({ id }, { filter }, { db: { products } }) => {
    if (filter) {
      return products.filter((product) => {
        if (product.categoryId === id) {
          for (const [key, value] of Object.entries(filter)) {
            if (product[key] !== value) {
              return false;
            }
          }

          return true;
        }
        return false;
      });
    }

    return products.filter((product) => product.categoryId === id);
  },
};
