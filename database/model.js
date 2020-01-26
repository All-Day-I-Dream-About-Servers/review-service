const sequelize = require('sequelize');
const Review = require('./index.js');

module.exports = {
  reviews: (limit, offset) => Review.findAll({ offset, limit }),
  summary: () => {
    Review.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'ratingAvg'],
        // [
        //   ,
        //   [sequelize.fn('AVG', sequelize.col('size')), 'sizeAvg'],
        //   [sequelize.fn('AVG', sequelize.col('width')), 'widthAvg'],
        //   [sequelize.fn('AVG', sequelize.col('comfort')), 'comfortAvg'],
        //   [sequelize.fn('AVG', sequelize.col('quality')), 'qualityAvg'],
        // ]
      ],
    });
  },
};
