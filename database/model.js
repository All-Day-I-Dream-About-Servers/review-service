const { Op } = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviewsByNewest: (limit, ratingArray) => Review.findAll({
    where: {
      rating: {
        [Op.or]: ratingArray,
      },
    },
    order: [['dateNum', 'DESC']],
    limit,
  }),
  reviewsByHelpful: (limit, ratingArray) => Review.findAll({
    where: {
      rating: {
        [Op.or]: ratingArray,
      },
    },
    order: [['helpfulYes', 'DESC']],
    limit,
  }),
  reviewsByRelevant: (limit, ratingArray) => Review.findAll({
    where: {
      verified: true,
      rating: {
        [Op.or]: ratingArray,
      },
    },
    limit,
  }),
  summary: () => Review.findAll({}),
};
