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
      nBtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
      HbtnActive: null,
      rBtnActive: null,
    };

    this.getReviewsSummary = this.getReviewsSummary.bind(this);
    this.getReviewsByNewest = this.getReviewsByNewest.bind(this);
    this.getReviewsByHelpful = this.getReviewsByHelpful.bind(this);
    this.getReviewsByRelevant = this.getReviewsByRelevant.bind(this);
    this.newestClickHandler = this.newestClickHandler.bind(this);
    this.helpfulClickHandler = this.helpfulClickHandler.bind(this);
    this.relevantClickHandler = this.relevantClickHandler.bind(this);
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
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

  newestClickHandler(e) {
    e.preventDefault();
    this.getReviewsByNewest();
    this.setState({
      nBtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
      HbtnActive: null,
      rBtnActive: null,
    });
  }

  helpfulClickHandler(e) {
    e.preventDefault();
    this.getReviewsByHelpful();
    this.setState({
      nBtnActive: null,
      HbtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
      rBtnActive: null,
    });
  }

  relevantClickHandler(e) {
    e.preventDefault();
    this.getReviewsByRelevant();
    this.setState({
      nBtnActive: null,
      HbtnActive: null,
      rBtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
    });
  }

  loadMoreReviews(e) {
    e.preventDefault();
    this.setState((prevState) => {
      const temp = prevState.displayCount + 5;
      return { displayCount: temp };
    }, () => {
      if (this.state.nBtnActive) {
        this.getReviewsByNewest();
      } else if (this.state.HbtnActive) {
        this.getReviewsByHelpful();
      } else {
        this.getReviewsByRelevant();
      }
    });
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

    const sizeTrianglePosition = {
      left: `${(this.state.summary.avgSize / 10) * 100}%`,
    };

    const widthTrianglePosition = {
      left: `${(this.state.summary.avgWidth / 10) * 100}%`,
    };

    const comfortTrianglePosition = {
      left: `${(this.state.summary.avgComfort / 10) * 100}%`,
    };

    const qualityTrianglePosition = {
      left: `${(this.state.summary.avgQuality / 10) * 100}%`,
    };

    const overallRatingFill = {
      width: `${(Math.round(this.state.summary.avgRating * 10) / 10) * 20}%`,
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
                  <h4>{(Math.round(this.state.summary.avgRating * 10) / 10).toFixed(1)}</h4>
                </div>
                <div className="review-body-s v-spacing-s overall-stars">
                  <div className="overall-stars-pos">
                    <span className="overall-stars-display"><span style={overallRatingFill} /></span>
                  </div>
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
            <div className="recommendation-heading v-spacing-m">
              <h4>{this.state.summary.percentRec}%</h4>
              <div className="recommendation-tagline">of customers recommend this product</div>
            </div>
            <div className="comparison-container">
              <div className="comparison-title">SIZE</div>
              <div className="comparison-bar">
                <div className="comparison-bar-spacer1" />
                <div className="comparison-bar-spacer2" />
                <div className="comparison-bar-spacer3" />
                <div className="comparison-triangle" style={sizeTrianglePosition} />
              </div>
              <div className="comparison-text-wrapper">
                <div className="comparison-text-left">TOO SMALL</div>
                <div className="comparison-text-mid">PERFECT</div>
                <div className="comparison-text-right">TOO LARGE</div>
              </div>
            </div>
            <div className="comparison-container">
              <div className="comparison-title">WIDTH</div>
              <div className="comparison-bar">
                <div className="comparison-bar-spacer1" />
                <div className="comparison-bar-spacer2" />
                <div className="comparison-bar-spacer3" />
                <div className="comparison-triangle" style={widthTrianglePosition} />
              </div>
              <div className="comparison-text-wrapper">
                <div className="comparison-text-left">TOO NARROW</div>
                <div className="comparison-text-mid">PERFECT</div>
                <div className="comparison-text-right">TOO WIDE</div>
              </div>
            </div>
            <div className="comparison-container">
              <div className="comparison-title">COMFORT</div>
              <div className="comparison-bar">
                <div className="comparison-bar-spacer1" />
                <div className="comparison-bar-spacer2" />
                <div className="comparison-bar-spacer3" />
                <div className="comparison-triangle" style={comfortTrianglePosition} />
              </div>
              <div className="comparison-text-wrapper">
                <div className="comparison-text-left">UNCOMFORTABLE</div>
                <div className="comparison-text-right">COMFORTABLE</div>
              </div>
            </div>
            <div className="comparison-container">
              <div className="comparison-title">QUALITY</div>
              <div className="comparison-bar">
                <div className="comparison-bar-spacer1" />
                <div className="comparison-bar-spacer2" />
                <div className="comparison-bar-spacer3" />
                <div className="comparison-triangle" style={qualityTrianglePosition} />
              </div>
              <div className="comparison-text-wrapper">
                <div className="comparison-text-left">POOR</div>
                <div className="comparison-text-right">PERFECT</div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-reviews offset-l-1 col-xl-12 col-l-14 col-s-12">
          <div className="reviews-sort-header">
            <div className="reviews-section-title v-spacing-s">SORT ON</div>
            <div className="reviews-sort-buttons">
              <button type="button" className="reviews-sort-btn" style={this.state.nBtnActive} onClick={this.newestClickHandler}>newest</button>
              <button type="button" className="reviews-sort-btn" style={this.state.HbtnActive} onClick={this.helpfulClickHandler}>helpful</button>
              <button type="button" className="reviews-sort-btn" style={this.state.rBtnActive} onClick={this.relevantClickHandler}>relevant</button>
            </div>
            <div className="v-spacing-l" />
          </div>
          {this.state.reviews.map((review, index) => (
            <Review info={review} key={index} />
          ))}
          <div className="review-bottom-btns">
            <div className="load-more-btn-container">
              <button type="button" className="load-more-btn" onClick={this.loadMoreReviews}>LOAD MORE</button>
            </div>
            <div className="write-review-container">
              <button type="button" className="write-review-btn">WRITE A REVIEW <svg className="write-review-btn-icon"> <path d="M17.59 7l5 5-5 5M0 12h22" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" /> </svg> </button>
            </div>
          </div>
          <div className="review-module-bottom-spacing" />
        </div>
      </div>
    );
  }
}
