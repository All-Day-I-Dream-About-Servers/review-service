const { Op } = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviewsByNewest: (limit) => Review.findAll({ order: [['dateNum', 'DESC']], limit }),
  reviewsByHelpful: (limit) => Review.findAll({ order: [['helpfulYes', 'DESC']], limit }),
  reviewsByRelevant: (limit) => Review.findAll({ where: { verified: true }, limit }),
  summary: () => Review.findAll({}),
};
