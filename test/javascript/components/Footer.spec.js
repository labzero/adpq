import React from 'react';
import {shallow} from 'enzyme'
import Footer from 'components/Footer/Footer'

describe('<Footer />', () => {
  let props;

  beforeEach(() => {
    props = {
      isHomepage: false,
      isAuthorized: true
    };
  });

  it('renders a slim footer by default', () => {
    const rendered = shallow(<Footer { ...props }/>);
    expect(rendered.html()).toContain('usa-footer-slim');
    expect(rendered.html()).not.toContain('footer usa-footer usa-footer-big');
  })

  it('renders a big footer on the homepage', () => {
    props = {
      isHomepage: true,
      isAuthorized: true
    };
    const rendered = shallow(<Footer { ...props }/>);
    expect(rendered.html()).toContain('usa-footer usa-footer-big');
    expect(rendered.html()).not.toContain('footer-slim usa-footer-slim');
  })

  it('renders limited footer when not logged in', () => {
    props = {
      isHomepage: true,
      isAuthorized: false
    };
    const rendered = shallow(<Footer { ...props }/>);
    expect(rendered.html()).not.toContain('usa-footer-nav');
  })


});
