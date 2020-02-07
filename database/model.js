const { Op } = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviewsByNewest: (id, limit, ratingArray) => Review.findAll({
    where: {
      prodId: id,
      rating: {
        [Op.or]: ratingArray,
      },
    },
    order: [['dateNum', 'DESC']],
    limit,
  }),
  reviewsByHelpful: (id, limit, ratingArray) => Review.findAll({
    where: {
      prodId: id,
      rating: {
        [Op.or]: ratingArray,
      },
    },
    order: [['helpfulYes', 'DESC']],
    limit,
  }),
  reviewsByRelevant: (id, limit, ratingArray) => Review.findAll({
    where: {
      prodId: id,
      verified: true,
      rating: {
        [Op.or]: ratingArray,
      },
    },
    limit,
  }),
  summary: (id) => Review.findAll({
    where: {
      prodId: id,
    },
  }),
};
