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
    this.getReviewsByNewest = this.getReviews.bind(this);
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
          reviews: data.data
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <div className="reviews-summary">
          <div>
            <h3>RATINGS &amp; REVIEWS</h3>
          </div>
          <div>
            <div className="reviews-heading">
              <h4>{this.state.summary.avgRating}</h4>
              <span>Insert stars</span>
              <span>{this.state.summary.totalReviews} Reviews</span>
            </div>
            <h5>RATING BREAKDOWN</h5>
            <ul>
              <li>5 STARS</li>
              <li>4 STARS</li>
              <li>3 STARS</li>
              <li>2 STARS</li>
              <li>1 STARS</li>
            </ul>
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
        <div className="reviews-reviews">
          {this.state.reviews.map((review, index) => (
            <Review info={review} key="review" index={index} />
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
