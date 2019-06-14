import React from 'react';
import { shallow } from '../../enzyme';
import Home from '../../src/components/pages/Home';

describe('My Journal application, Home page', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });

  it('renders top content header correctly', () => {
    const wrapper = shallow(<Home />);
    const homePageTopHeader = wrapper
      .find('.home-top-content h4')
      .children()
      .first()
      .text();
    expect(homePageTopHeader).toEqual('Quis autem vel eum iure');
  });

  it('renders top call to action button correctly', () => {
    const wrapper = shallow(<Home />);
    const callToAction = wrapper
      .find('.home-top-content')
      .children()
      .find('.btn-journal')
      .children()
      .text();
    expect(callToAction).toEqual('Create a Journal');
  });

  it('renders five svg logo', () => {
    const wrapper = shallow(<Home />);
    const svgLogos = wrapper.find('.coy-logos').children();
    expect(svgLogos.length).toEqual(5);
  });
});
