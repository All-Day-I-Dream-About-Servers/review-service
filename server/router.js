const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  .get(controller.getReviews);

module.exports = router;
