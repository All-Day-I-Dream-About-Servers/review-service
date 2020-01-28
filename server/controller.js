const models = require('../database/model.js');

const controller = {
  getReviewsByNewest: (req, res) => {
    models.reviewsByNewest(Number(req.params.limit))
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  },
  getReviewsByHelpful: (req, res) => {
    models.reviewsByHelpful(Number(req.params.limit))
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  },
  getReviewsByRelevant: (req, res) => {
    models.reviewsByRelevant(Number(req.params.limit))
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  },
  getSummary: (req, res) => {
    models.summary()
      .then((data) => {
        const summary = {
          avgRating: 0,
          totalReviews: data.length,
          totalFive: 0,
          totalFour: 0,
          totalThree: 0,
          totalTwo: 0,
          totalOne: 0,
          percentRec: 0,
          avgSize: 0,
          avgWidth: 0,
          avgComfort: 0,
          avgQuality: 0,
        };
        let totalRating = 0; let numRec = 0;
        let totalSize = 0; let totalWidth = 0; let totalComfort = 0; let totalQuality = 0;
        data.forEach((review) => {
          totalRating += review.rating;
          if (review.rating === 5) {
            summary.totalFive += 1;
          } else if (review.rating === 4) {
            summary.totalFour += 1;
          } else if (review.rating === 3) {
            summary.totalThree += 1;
          } else if (review.rating === 2) {
            summary.totalTwo += 1;
          } else {
            summary.totalOne += 1;
          }
          if (review.recommended) {
            numRec += 1;
          }
          totalSize += review.size;
          totalWidth += review.width;
          totalComfort += review.comfort;
          totalQuality += review.quality;
        });
        summary.avgRating = totalRating / data.length;
        summary.percentRec = Math.round((numRec / data.length) * 100);
        summary.avgSize = totalSize / data.length;
        summary.avgWidth = totalWidth / data.length;
        summary.avgComfort = totalComfort / data.length;
        summary.avgQuality = totalQuality / data.length;
        // send summary of scores back to client
        res.status(200).send(summary);
      })
      .catch((err) => res.status(400).send(err));
  },
};

module.exports = controller;
