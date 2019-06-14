import React from 'react';
import { shallow } from '../enzyme';
import App from '../src/components/App';

describe('My Journal application', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });
});
