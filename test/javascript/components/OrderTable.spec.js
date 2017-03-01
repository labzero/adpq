import React from 'react';
import { shallow } from 'enzyme';
import OrderTable from 'components/OrderTable/OrderTable';

describe('OrderTable', () => {
  let props;
  beforeEach(() => {
    props = {
      orders: [
        {
          id: 0,
          items: [
            {
              price: 12300,
              quantity: 1
            },
            {
              price: 45600,
              quantity: 1
            }
          ]
        },
        {
          id: 1,
          items: [
            {
              price: 78900,
              quantity: 2
            }
          ]
        }
      ]
    }
  })
  
  it('displays total spent', () => {
    const rendered = shallow(<OrderTable {...props} />);

    expect(rendered.text()).toContain('$2,157.00 spent')
  })
  
  it('displays total price per order', () => {
    const rendered = shallow(<OrderTable {...props} />);

    expect(rendered.text()).toContain('$579.00')
    expect(rendered.text()).toContain('$1,578.00')
  })
})
