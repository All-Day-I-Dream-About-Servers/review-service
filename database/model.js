const Sequelize = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviews: () => Review.findAll(),
};
