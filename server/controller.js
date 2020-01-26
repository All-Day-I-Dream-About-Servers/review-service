// const helpers = require('./');

const controller = {
  getReviews: (req, res) => {
    res.status(200).send('Get request received');
  },
  getOverview: (req, res) => {
    res.status(200).send('Get request received');
  },
};

module.exports = controller;
