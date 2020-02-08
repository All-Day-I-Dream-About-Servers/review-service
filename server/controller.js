const models = require('../database/model.js');

const controller = {
  // gets reviews sorted by date/newest
  getReviewsByNewest: (req, res) => {
    // id determined by base endpoint (product id#)
    // value is sliced because baseUrl returns entire endpoint ex. '/2', we only use '2'
    const id = req.baseUrl.slice(1);

    // filter comes in as a string (otherwise url doesn't resolve),
    // so it needs to be parsed back into an array
    const filter = JSON.parse(req.params.filter);

    // checks if filter has any terms, if so filter by those values
    // otherwise don't filter, aka "filter" by all ratings
    if (filter.length) {
      // filtered query
      models.reviewsByNewest(id, Number(req.params.limit), filter)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
    } else {
      // "unfiltered" query
      models.reviewsByNewest(id, Number(req.params.limit), [1, 2, 3, 4, 5])
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
    }
  },
  // gets reviews sorted by helpful score
  // see getReviewsByNewest for parameter notes
  getReviewsByHelpful: (req, res) => {
    const id = req.baseUrl.slice(1);
    const filter = JSON.parse(req.params.filter);
    if (filter.length) {
      models.reviewsByHelpful(id, Number(req.params.limit), filter)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
    } else {
      models.reviewsByHelpful(id, Number(req.params.limit), [1, 2, 3, 4, 5])
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
    }
  },
  // gets reviews filtered by verified purchasers
  // see getReviewsByNewest for parameter notes
  getReviewsByRelevant: (req, res) => {
    const id = req.baseUrl.slice(1);
    const filter = JSON.parse(req.params.filter);
    if (filter.length) {
      models.reviewsByRelevant(id, Number(req.params.limit), filter)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
    } else {
      models.reviewsByRelevant(id, Number(req.params.limit), [1, 2, 3, 4, 5])
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err));
    }
  },
  // get all reviews for given product, process aggregates and save as corresponding
  // property values in output object. send output object as response
  // (this computes the summary data of the product and sends the result to the client,
  // without sending all of the reviews to the client)
  getSummary: (req, res) => {
    const id = req.baseUrl.slice(1);
    models.summary(id)
      .then((data) => {
        // this value will be used as the 'summary' state property in the client
        // it contains all values needed to render the overview section of the reviews module
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
