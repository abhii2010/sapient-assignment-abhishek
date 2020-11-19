import React from 'react';
import { shallow } from 'enzyme';
 
import App from './App';

let wrapped = shallow(<App />);
 
describe('App', () => {
  test('snapshot renders', () => {
    expect(wrapped).toMatchSnapshot();
  });
});