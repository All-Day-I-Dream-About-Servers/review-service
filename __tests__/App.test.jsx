/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../client/src/components/App';

describe('<App /> Unit Tests', () => {
  it('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});
