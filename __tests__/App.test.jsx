/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import 'jest-styled-components';
// import toJson from 'enzyme-to-json';
// import axios from 'axios';
import App from '../client/src/components/App';
import Review from '../client/src/components/Review';

describe('<App /> Initial Rendering', () => {
  it('should render the stateful <App /> component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveState('reviews');
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

  it('should render 2 <Review /> components on load', () => {
    const wrapper = shallow(<App />);
    const mockGetter = jest.fn(() => {
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
      wrapper.setState({
        reviews: data.data,
      });
    });
    wrapper.instance().getReviewsByNewest = mockGetter;
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(wrapper.find('Review')).toContainMatchingElements(2, Review);
  });

  it('should render five slider components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toContainMatchingElements(5, '.star-bar');
  });
});

describe('<App /> methods', () => {
  it('should alter the style of the sorting buttons when newest gets clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button.newest').simulate('click', {
      preventDefault: () => {
      },
    });
    expect(wrapper).toHaveState({
      nBtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
    });
  });

  it('should alter the style of the sorting buttons when helpful gets clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button.helpful').simulate('click', {
      preventDefault: () => {
      },
    });
    expect(wrapper).toHaveState({
      hBtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
    });
  });

  it('should alter the style of the sorting buttons when relevant gets clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button.relevant').simulate('click', {
      preventDefault: () => {
      },
    });
    expect(wrapper).toHaveState({
      rBtnActive: {
        fontWeight: '700',
        border: '1px solid #000',
        borderBottom: '2px solid #000',
      },
    });
  });

  it('should load 5 more reviews when load more button is clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('.load-more-btn').simulate('click', {
      preventDefault: () => {},
    });
    expect(wrapper).toHaveState({
      displayCount: 7,
    });
  });

  it('should add a filter to the results after clicking on a rating distribution line ', () => {
    const wrapper = shallow(<App />);
    wrapper.findWhere((n) => n.text() === '5 STARS' && n.type() === 'li').simulate('click', {
      preventDefault: () => {},
      persist: () => {},
      target: {
        id: 5,
      },
    });
    expect(wrapper).toContainMatchingElement('.review-filter-list-item');
  });

  it('should clear all filters after clicking remove all filters button', () => {
    const wrapper = shallow(<App />);
    wrapper.findWhere((n) => n.text() === '5 STARS' && n.type() === 'li').simulate('click', {
      preventDefault: () => {},
      persist: () => {},
      target: {
        id: 5,
      },
    });
    wrapper.find('.remove-filter-btn').simulate('click', {
      preventDefault: () => {},
    });
    expect(wrapper).not.toContainMatchingElement('.review-filter-list-item');
  });
});
