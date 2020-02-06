/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
// import axios from 'axios';
import Review from '../client/src/components/Review';

describe('<Review /> unit tests', () => {
  const info = {
    id: 34,
    rating: 3,
    title: 'Best shoes',
    body: 'Doloremque esse ad. Voluptatem repellendus itaque. Aspernatur nisi debitis culpa exercitationem. Cum earum voluptatem.',
    recommended: true,
    name: 'Selena.Doyle96',
    verified: false,
    helpfulYes: 13,
    helpfulNo: 8,
    date: 'December 11, 2019',
    dateNum: 20191111,
    size: 8,
    width: 4,
    comfort: 7,
    quality: 7,
  };

  it('should display a checkmark if the item is recommended', () => {
    const review = shallow(<Review info={info} />);
    expect(review.find('img').prop('src')).toEqual('http://localhost:3003/checkmark.png');
  });
});
