import React from 'react';
import {shallow} from 'enzyme'
import Footer from 'components/Footer/Footer'

describe('<Footer />', () => {
  let props;

  beforeEach(() => {
    props = {
      footerMode: 'less'
    };
  });

  it('renders a slim footer', () => {
    const rendered = shallow(<Footer { ...props }/>);
    expect(rendered.html()).toContain('usa-footer-slim');
    expect(rendered.html()).not.toContain('footer usa-footer usa-footer-big');
  })

  it('renders a big footer', () => {
    props = {
      footerMode: 'more'
    };
    const rendered = shallow(<Footer { ...props }/>);
    expect(rendered.html()).toContain('usa-footer usa-footer-big');
    expect(rendered.html()).not.toContain('footer-slim usa-footer-slim');
  })

  it('renders limited footer', () => {
    props = {
      footerMode: 'none'
    };
    const rendered = shallow(<Footer { ...props }/>);
    expect(rendered.html()).not.toContain('usa-footer-nav');
  })
  
});
