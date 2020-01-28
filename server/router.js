const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('newest/:limit')
  .get(controller.getReviewsByNewest);

router
  .route('helpful/:limit')
  .get(controller.getReviewsByHelpful);

router
  .route('relevant/:limit')
  .get(controller.getReviewsByRelevant);

router
  .route('/overview')
  .get(controller.getSummary);

module.exports = router;
