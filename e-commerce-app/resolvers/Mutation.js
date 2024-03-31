const { v4: uuid } = require("uuid");
const { product } = require("./Query");

module.exports = {
  addCategory: (_parent, { input: { name } }, { db: { categories } }) => {
    const newCategory = {
      id: uuid(),
      name,
      products: [],
    };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (_parent, { input }, { db: { products } }) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (_parent, { input }, { db: { reviews } }) => {
    const { title, comment, productId, rating } = input;
    const newReview = {
      id: uuid(),
      date: new Date().toISOString().split("T")[0],
      title,
      comment,
      rating,
      productId,
    };
    reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (_parent, { id }, { db }) => {
    const category = db.categories.find((category) => category.id === id);

    if (category) {
      console.log(category);
      db.categories = db.categories.filter((category) => category.id !== id);
      db.products = db.products.map((product) => {
        if (product.categoryId === id) {
          return {
            ...product,
            categoryId: null,
          };
        }

        return product;
      });
      return true;
    }

    return false;
  },
  deleteProduct: (_parent, { id }, { db }) => {
    const product = db.products.find((product) => product.id === id);

    if (product) {
      db.products = db.products.filter((product) => product.id !== id);
      db.reviews = db.reviews.filter((review) => review.productId !== id);
      return true;
    }

    return false;
  },
  deleteReview: (_parent, { id }, { db }) => {
    const review = db.reviews.find((review) => review.id !== id);
    if (review) {
      db.reviews = db.reviews.filter((review) => review.id !== id);
      return true;
    }

    return false;
  },
  updateProduct: (_parent, { id, input }, { db }) => {
    let updatedProduct = {};

    db.products = db.products.map((product) => {
      if (product.id === id) {
        updatedProduct = {
          ...product,
          ...input,
        };
        return updatedProduct;
      }
      return product;
    });
    return updatedProduct;
  },
  updateCategory: (_parent, { id, input: { name } }, { db }) => {
    let updatedCategory = {};

    db.categories = db.categories.map((category) => {
      if (category.id === id) {
        updatedCategory = {
          ...category,
          name,
        };
        return updatedCategory;
      }

      return category;
    });

    return updatedCategory;
  },
  updateReview: (_parent, { id, input }, { db }) => {
    let updatedReview = {};
    db.reviews = db.reviews.map((review) => {
      if (review.id === id) {
        updatedReview = {
          ...review,
          ...input,
        };
        return updatedReview;
      }

      return review;
    });

    return updatedReview;
  },
};
