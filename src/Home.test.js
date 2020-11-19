import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

let wrapped = shallow(<Home />);
describe('Home', () => {
  test('snapshot renders', () => {
    expect(wrapped).toMatchSnapshot();
  });
});