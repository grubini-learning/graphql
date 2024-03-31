const filterOnSale = (items) => {
  return items.filter((item) => item.onSale);
};

const filterAverage = (items) => {
  const total = items.reduce((total, current) => {
    total += current.rating;
  }, 0);

  return Math.floor(total / items.length);
};

module.exports = {
  filterOnSale,
  filterAverage,
};
