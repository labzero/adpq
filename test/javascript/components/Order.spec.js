import React from 'react';
import {shallow} from 'enzyme'
import Order from 'components/Order/Order'

describe('<Order />', () => {
  let props;

  beforeEach(() => {
    props = {
      fetchOrder: function() {},
      orderReport: {
        items: [],
        remoteDataState: 'LOADED'
      },
      order: {id: 1324, status: 'IN PROGRESS', items: [{id: 1, name: 'Computer', sku: '39103'}, {id: 2, name: 'Screen', sku: '439103'}]},
      isAdmin: true
    };
  });

  it('renders an order detail view', () => {
    const rendered = shallow(<Order { ...props }/>);
    expect(rendered.html()).toContain('<h3>Order #1324</h3>');
  })

  it('should let admins sees sku links', () => {
    const rendered = shallow(<Order { ...props }/>);
    expect(rendered.html()).toContain('<a href=\"#edit-item\">39103</a>');
    expect(rendered.html()).toContain('<a href=\"#edit-item\">439103</a>');
  })

  it('should not let requestor see sku link', () => {
    props.isAdmin = false;
    const rendered = shallow(<Order { ...props }/>);
    expect(rendered.html()).not.toContain('<a href=\"#edit-item\">39103</a>');
  })

});
