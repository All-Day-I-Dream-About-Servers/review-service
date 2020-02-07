/* eslint-disable no-console */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('reviews', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Review = sequelize.define('Review', {
  prodId: { type: Sequelize.INTEGER, allowNull: false },
  rating: { type: Sequelize.INTEGER, allowNull: false },
  title: Sequelize.STRING,
  body: { type: Sequelize.TEXT, allowNull: false },
  recommended: { type: Sequelize.BOOLEAN, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  verified: { type: Sequelize.BOOLEAN, allowNull: false },
  helpfulYes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  helpfulNo: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  date: { type: Sequelize.STRING, allowNull: false },
  dateNum: { type: Sequelize.INTEGER, allowNull: false },
  size: { type: Sequelize.INTEGER, allowNull: false },
  width: { type: Sequelize.INTEGER, allowNull: false },
  comfort: { type: Sequelize.INTEGER, allowNull: false },
  quality: { type: Sequelize.INTEGER, allowNull: false },
}, { timestamps: false });

sequelize.authenticate()
  .then(() => console.log('Database connection established'))
  .catch((err) => console.error(err));


module.exports = Review;
