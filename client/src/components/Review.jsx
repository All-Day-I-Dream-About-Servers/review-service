/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';

const Review = (props) => {
  const { info } = props;

  let recommendText = null;
  let imgSrc = null;
  if (info.recommended === true) {
    recommendText = ' I recommend this product';
    imgSrc = 'http://localhost:3003/checkmark.png';
  }

  let verifiedUser = null;
  if (info.verified === true) {
    verifiedUser = ' - Verified Purchaser';
  }

  let title = null;
  if (info.title) {
    title = info.title.toUpperCase();
  }

  return (
    <div>
      <div className="review-body">
        <div className="review-rating">{'★'.repeat(info.rating) + '☆'.repeat(5 - info.rating)}</div>
        <div className="review-date">{info.date}</div>
        <h5 className="review-title v-spacing-s">{title}</h5>
        <div className="review-body v-spacing-m">{info.body}</div>
        <div className="review-lower-text v-spacing-s"><img src={imgSrc} height="12px" alt="" />{recommendText}</div>
        <div className="review-lower-text">
          <span className="review-username">{info.name}</span>
          <span className="review-verified">{verifiedUser}</span>
        </div>
      </div>
      <div className="review-lower-text v-spacing-l">
        <span>Was this review helpful?</span>
        <span className="review-replies">
          <span className="review-reply-text">Yes</span>
          <span className="review-reply-count"> ({info.helpfulYes})</span>
        </span>
        <span className="review-replies">
          <span className="review-reply-text">No</span>
          <span className="review-reply-count"> ({info.helpfulNo})</span>
        </span>
      </div>
      <div className="reviews-divider" />
    </div>
  );
};

export default Review;
