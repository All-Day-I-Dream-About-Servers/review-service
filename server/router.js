const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/newest/:limit/:filter')
  .get(controller.getReviewsByNewest);

router
  .route('/helpful/:limit/:filter')
  .get(controller.getReviewsByHelpful);

router
  .route('/relevant/:limit/:filter')
  .get(controller.getReviewsByRelevant);

router
  .route('/overview')
  .get(controller.getSummary);

module.exports = router;
