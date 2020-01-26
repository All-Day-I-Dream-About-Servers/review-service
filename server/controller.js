const models = require('../database/model.js');

const controller = {
  getReviews: (req, res) => {
    models.reviews()
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  },
};

module.exports = controller;
