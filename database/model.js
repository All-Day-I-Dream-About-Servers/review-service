const { Op } = require('sequelize');
const Review = require('./index.js');

module.exports = {
  // Parameters:
  // id - id# of the product, query only interested in reviews where prodId === id
  // limit - how many reviews are retrieved from the db in query
  // ratingArray - an array of star ratings to further filter results by rating

  // retrieves reviews from the db pre-sorted by date (descending/newest first)
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
  // retrieves reviews from the db pre-sorted by helpful 'score' (descending/largest first)
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
  // retrieves only reviews by verified purchasers
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
  // retrieves all reviews for given product/id#
  summary: (id) => Review.findAll({
    where: {
      prodId: id,
    },
  }),
};
