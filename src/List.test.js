import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

const mockRecords = [
  {
    launch_success: true,
    landing_success: true,
    launch_year: '2006',
    mission_name: 'test',
    links: {
      mission_patch_small: ''
    },
    mission_id: []
  }
];

let wrapped = shallow(<List records={mockRecords}/>);
describe('List', () => {
  test('snapshot renders', () => {
    expect(wrapped).toMatchSnapshot();
  });
});