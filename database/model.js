const sequelize = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviews: (limit) => Review.findAll({ limit }),
  summary: () => Review.findAll({}),
};
