const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  .get(controller.getReviews);

router
  .route('/overview')
  .get(controller.getOverview);

module.exports = router;
