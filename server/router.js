const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/:id/newest/:limit/:filter')
  .get(controller.getReviewsByNewest);

router
  .route('/:id/helpful/:limit/:filter')
  .get(controller.getReviewsByHelpful);

router
  .route('/:id/relevant/:limit/:filter')
  .get(controller.getReviewsByRelevant);

router
  .route('/:id/overview')
  .get(controller.getSummary);

module.exports = router;
