/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Review from './Review';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: {},
      displayCount: 2,
      reviews: [],
    };

    this.getReviewsSummary = this.getReviewsSummary.bind(this);
    this.getReviewsByNewest = this.getReviewsByNewest.bind(this);
    this.getReviewsByHelpful = this.getReviewsByHelpful.bind(this);
    this.getReviewsByRelevant = this.getReviewsByRelevant.bind(this);
  }

  componentDidMount() {
    this.getReviewsSummary();
    this.getReviewsByNewest();
  }

  getReviewsSummary() {
    axios.get('/api/reviews/overview')
      .then((data) => {
        this.setState({
          summary: data.data,
        });
      })
      .catch((err) => console.error(err));
  }

  getReviewsByNewest() {
    axios.get(`/api/reviews/newest/${this.state.displayCount}`)
      .then((data) => {
        this.setState({
          reviews: data.data,
        });
      })
      .catch((err) => console.error(err));
  }

  getReviewsByHelpful() {
    axios.get(`/api/reviews/helpful/${this.state.displayCount}`)
      .then((data) => {
        this.setState({
          reviews: data.data,
        });
      })
      .catch((err) => console.error(err));
  }

  getReviewsByRelevant() {
    axios.get(`/api/reviews/relevant/${this.state.displayCount}`)
      .then((data) => {
        this.setState({
          reviews: data.data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const fiveStarBarWidth = {
      width: `${(this.state.summary.totalFive / this.state.summary.totalReviews) * 100}%`,
    };

    const fourStarBarWidth = {
      width: `${(this.state.summary.totalFour / this.state.summary.totalReviews) * 100}%`,
    };

    const threeStarBarWidth = {
      width: `${(this.state.summary.totalThree / this.state.summary.totalReviews) * 100}%`,
    };

    const twoStarBarWidth = {
      width: `${(this.state.summary.totalTwo / this.state.summary.totalReviews) * 100}%`,
    };

    const oneStarBarWidth = {
      width: `${(this.state.summary.totalOne / this.state.summary.totalReviews) * 100}%`,
    };

    return (
      <div>
        <div className="reviews-heading offset-xl-2 col-xl-20 offset-l-1 col-l-22 col-s-12 v-spacing-l">
          <div>
            <h3>RATINGS &amp; REVIEWS</h3>
          </div>
        </div>
        <div className="reviews-summary offset-xl-2 offset-l-1 col-l-7 col-s-12">
          <div>
            <div className="reviews-rating v-spacing-m">
              <div className="totals">
                <div className="overall-rating">
                  <h4>{Math.round(this.state.summary.avgRating * 10) / 10}</h4>
                </div>
                <div className="overall-rating-stats">
                  <span className="v-spacing-s">Insert stars</span>
                  <span className="review-body-s"><strong>{this.state.summary.totalReviews}</strong> Reviews</span>
                </div>
              </div>
            </div>
            <h5 className="review-heading-s">RATING BREAKDOWN</h5>
            <div className="sliders v-spacing-m">
              <ul className="slider-list">
                <li className="v-spacing-s">
                  <div className="slider-text">5 STARS</div>
                  <div className="star-bar">
                    <div className="star-bar-filled" style={fiveStarBarWidth} />
                  </div>
                  <div className="review-count">{this.state.summary.totalFive}</div>
                </li>
                <li className="v-spacing-s">
                  <div className="slider-text">4 STARS</div>
                  <div className="star-bar">
                    <div className="star-bar-filled" style={fourStarBarWidth} />
                  </div>
                  <div className="review-count">{this.state.summary.totalFour}</div>
                </li>
                <li className="v-spacing-s">
                  <div className="slider-text">3 STARS</div>
                  <div className="star-bar">
                    <div className="star-bar-filled" style={threeStarBarWidth} />
                  </div>
                  <div className="review-count">{this.state.summary.totalThree}</div>
                </li>
                <li className="v-spacing-s">
                  <div className="slider-text">2 STARS</div>
                  <div className="star-bar">
                    <div className="star-bar-filled" style={twoStarBarWidth} />
                  </div>
                  <div className="review-count">{this.state.summary.totalTwo}</div>
                </li>
                <li className="v-spacing-s">
                  <div className="slider-text">1 STARS</div>
                  <div className="star-bar">
                    <div className="star-bar-filled" style={oneStarBarWidth} />
                  </div>
                  <div className="review-count">{this.state.summary.totalOne}</div>
                </li>
              </ul>
            </div>
            <div className="recommendation-heading">
              <h4>{this.state.summary.percentRec}%</h4>
              <span>of customers recommend this product</span>
            </div>
            <div>SIZE</div>
            <div>WIDTH</div>
            <div>COMFORT</div>
            <div>QUALITY</div>
          </div>
        </div>
        <div className="reviews-reviews offset-l-1 col-xl-12 col-l-14 col-s-12">
          <div className="reviews-sort-header">
            <div>SORT ON</div>
            <div>
              <button type="button" className="reviews-sort-btn">newest</button>
              <button type="button" className="reviews-sort-btn">helpful</button>
              <button type="button" className="reviews-sort-btn">relevant</button>
            </div>
          </div>
          {this.state.reviews.map((review, index) => (
            <Review info={review} key={index} />
          ))}
          <div>
            <div>LOAD MORE</div>
            <div>WRITE A REVIEW</div>
          </div>
        </div>
      </div>
    );
  }
}
