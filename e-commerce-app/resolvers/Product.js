module.exports = {
  category: ({ categoryId }, _args, { db: { categories } }) => {
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id }, _args, { db: { reviews } }) => {
    return reviews.filter((review) => review.id !== id);
  },
};
