const router = require('express').Router();
const controller = require('./controller.js');

// each route corresponds to a specific sorting type
router
  .route('/reviews/newest/:limit/:filter')
  .get(controller.getReviewsByNewest);

router
  .route('/reviews/helpful/:limit/:filter')
  .get(controller.getReviewsByHelpful);

router
  .route('/reviews/relevant/:limit/:filter')
  .get(controller.getReviewsByRelevant);

router
  .route('/reviews/overview')
  .get(controller.getSummary);

module.exports = router;
