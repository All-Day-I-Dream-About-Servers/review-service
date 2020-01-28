import React from 'react';
import axios from 'axios';
import Review from './Review';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCount: 2,
      reviews: [],
      summary: {},
    };

    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getReviewsByRecent();
  }

  getReviewsByRecent() {
    axios.get(`/api/reviews/recent/${this.state.displayCount}`)
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
      </div>
    );
  }
}
