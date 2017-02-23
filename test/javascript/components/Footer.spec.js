import React from 'react';
import {shallow} from 'enzyme'
import Footer from 'components/Footer/Footer'

describe('<Footer />', () => {
  let props;

  beforeEach(() => {
    props = {
      isHomepage: false
    };
  });

  it('renders a slim footer by default', () => {
    const rendered = shallow(<Footer { ...props }/>)
    expect(rendered.html()).toContain('usa-footer-slim');
  })

  it('renders a big footer on the homepage', () => {
    props = {
      isHomepage: true
    };
    const rendered = shallow(<Footer { ...props }/>)
    expect(rendered.html()).toContain('usa-footer-big')
  })
});
