/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';

const Review = (props) => {
  const { info } = props;
  return (
    <div>
      <div className="review=body">
        <div>(stars)</div>
        <div>{info.date}</div>
        <h5>{info.title.toUpperCase()}</h5>
        <div>{info.body}</div>
        <div>(I recommend...)</div>
        <div>
          <span>{info.name}</span>
          <span>(verified purchaser)</span>
        </div>
      </div>
      <div className="review-replies">
        <span>Was this review helpful?</span>
        <span>Yes</span>
        <span>({info.helpfulYes})</span>
        <span>No</span>
        <span>({info.helpfulNo})</span>
      </div>
    </div>
  );
};

export default Review;
