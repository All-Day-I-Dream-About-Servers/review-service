const { Op } = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviewsByNewest: (id, limit, ratingArray) => Review.findAll({
    where: {
      id: {
        [Op.and]: {
          [Op.gt]: (29 % id) * Math.round(id % 7.7),
          [Op.lt]: 666 - (30 % id) * Math.round(id % 5.5),
        },
      },
      rating: {
        [Op.or]: ratingArray,
      },
    },
    order: [['dateNum', 'DESC']],
    limit,
  }),
  reviewsByHelpful: (id, limit, ratingArray) => Review.findAll({
    where: {
      id: {
        [Op.and]: {
          [Op.gt]: (29 % id) * Math.round(id % 7.7),
          [Op.lt]: 666 - (30 % id) * Math.round(id % 5.5),
        },
      },
      rating: {
        [Op.or]: ratingArray,
      },
    },
    order: [['helpfulYes', 'DESC']],
    limit,
  }),
  reviewsByRelevant: (id, limit, ratingArray) => Review.findAll({
    where: {
      id: {
        [Op.and]: {
          [Op.gt]: (29 % id) * Math.round(id % 7.7),
          [Op.lt]: 666 - (30 % id) * Math.round(id % 5.5),
        },
      },
      verified: true,
      rating: {
        [Op.or]: ratingArray,
      },
    },
    limit,
  }),
  summary: (id) => Review.findAll({
    where: {
      id: {
        [Op.and]: {
          [Op.gt]: (29 % id) * Math.round(id % 7.7),
          [Op.lt]: 666 - (30 % id) * Math.round(id % 5.5),
        },
      },
    },
  }),
};
