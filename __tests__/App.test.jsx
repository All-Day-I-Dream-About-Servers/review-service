/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../client/src/components/App';
import Review from '../client/src/components/Review';

describe('<App /> Unit Tests', () => {
  it('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  it('renders two Review components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Review)).to.have.length(2);
  });
});
