const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/api')
  .get(controller.getReviews);

router
  .route('/api/overview')
  .get(controller.getOverview);

module.exports = router;
