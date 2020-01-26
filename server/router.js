const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/:limit')
  .get(controller.getReviews);

router
  .route('/overview')
  .get(controller.getSummary);

module.exports = router;
