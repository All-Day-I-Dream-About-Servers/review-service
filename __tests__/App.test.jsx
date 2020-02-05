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
  it('should add a filter to the results after clicking on a rating distribution line ', () => {
    const wrapper = shallow(<App />);
    const mockFilter = jest.fn(() => {
      wrapper.setState({
        filter: [5],
      });
    });
    wrapper.instance().filterByRating = mockFilter;
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    wrapper.findWhere((n) => n.text() === '5 STARS' && n.type() === 'li').simulate('click');
    expect(wrapper).toContainMatchingElement('.review-filter-list-item');
  });

  it('should alter the style of the sorting buttons when newest gets clicked', () => {
    const wrapper = shallow(<App />);
    const mockClick = jest.fn(() => {
      wrapper.setState({
        nBtnActive: {
          fontWeight: '700',
          border: '1px solid #000',
          borderBottom: '2px solid #000',
        },
        HbtnActive: null,
        rBtnActive: null,
      });
    });
    wrapper.instance().newestClickHandler = mockClick;
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    wrapper.findWhere((n) => n.text() === 'newest' && n.type() === 'button').simulate('click');
    expect(wrapper.findWhere((n) => n.text() === 'newest')).toHaveStyleRule('fontWeight', '700');
  });

  // it('should alter the style of the sorting buttons when helpful gets clicked', () => {
  //   const wrapper = shallow(<App />);
  //   const mockClick = jest.fn(() => {
  //     wrapper.setState({
  //       nBtnActive: null,
  //       HbtnActive: {
  //         fontWeight: '700',
  //         border: '1px solid #000',
  //         borderBottom: '2px solid #000',
  //       },
  //       rBtnActive: null,
  //     });
  //   });
  //   wrapper.instance().helpfulClickHandler = mockClick;
  //   wrapper.instance().forceUpdate();
  //   wrapper.instance().componentDidMount();
  //   wrapper.findWhere((n) => n.text() === 'helpful').simulate('click');
  // });

  // it('should alter the style of the sorting buttons when relevant gets clicked', () => {
  //   const wrapper = shallow(<App />);
  //   const mockClick = jest.fn(() => {
  //     wrapper.setState({
  //       nBtnActive: null,
  //       HbtnActive: null,
  //       rBtnActive: {
  //         fontWeight: '700',
  //         border: '1px solid #000',
  //         borderBottom: '2px solid #000',
  //       },
  //     });
  //   });
  //   wrapper.instance().relevantClickHandler = mockClick;
  //   wrapper.instance().forceUpdate();
  //   wrapper.instance().componentDidMount();
  //   wrapper.findWhere((n) => n.text() === 'relevant').simulate('click');
  // });
});
