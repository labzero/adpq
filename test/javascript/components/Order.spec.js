import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { render } from 'enzyme'
import Order from 'components/Order/Order'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('<Order />', () => {
  let props;
  let store = mockStore({alerts: []})

  beforeEach(() => {
    props = {
      fetchOrder: function() {},
      orders: {
        items: [],
        remoteDataState: 'LOADED'
      },
      order: {id: 1324, status: 'IN PROGRESS', items: [{id: 1, name: 'Computer', sku: '39103'}, {id: 2, name: 'Screen', sku: '439103'}]},
      isAdmin: true,
      cancelOrder: () => true
    };
  });

  it('renders an order detail view', () => {
    const rendered = render(<Provider store={store}><Order { ...props }/></Provider>);
    expect(rendered.html()).toContain('<h3>Order #1324</h3>');
  })

  it('should let admins sees sku links', () => {
    const rendered = render (<Provider store={store}><Order { ...props }/></Provider>);
    expect(rendered.html()).toContain('<a href=\"#edit-item\">39103</a>');
    expect(rendered.html()).toContain('<a href=\"#edit-item\">439103</a>');
  })

  it('should not let requestor see sku link', () => {
    props.isAdmin = false;
    const rendered = render(<Provider store={store}><Order { ...props }/></Provider>);
    expect(rendered.html()).not.toContain('<a href=\"#edit-item\">39103</a>');
  })

});
