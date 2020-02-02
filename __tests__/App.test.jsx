/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
// import axios from 'axios';
import App from '../client/src/components/App';

describe('<App /> Unit Tests', () => {
  jest.mock('axios', () => {
    const data = {
      data: [
        {
          rating: 3,
          title: 'Best shoes',
          recommended: true,
          name: 'Selena.Doyle96',
          verified: false,
        },
        {
          rating: 1,
          title: 'Beware!',
          recommended: false,
          name: 'Belle.Adams',
          verified: true,
        },
      ],
    };
    return {
      get: jest.fn(() => Promise.resolve(data)),
    };
  });

  it('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  it('should invoke getReviewsSummary on componentDidMount', () => {
    const wrapper = shallow(<App />);
    const mock = jest.fn();
    wrapper.instance().getReviewsSummary = mock;
    wrapper.instance().forceUpdate();
    wrapper
      .instance()
      .componentDidMount();
    expect(mock).toHaveBeenCalled();
  });

  it('should render five slider components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toContainMatchingElements(5, '.star-bar');
  });
});
