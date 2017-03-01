import React from 'react';
import {shallow} from 'enzyme'
import Cart from 'components/Cart/Cart'
import * as RemoteDataStates from 'constants/RemoteDataStates'

const items = [{
  id: 0,
  name: 'Dell Optiplex 3040 MT',
  manufacturer: 'DELL',
  sku: '210-AFXL',
  price: 10000,
  quantity: 2
},
{
  id: 1,
  name: 'Dell Somethingelse',
  manufacturer: 'DELL',
  sku: '311-ABCD',
  price: 20000,
  quantity: 1
}]

describe('Cart', () => {
  let props;

  beforeEach(() => {
    props = {
      placeOrder: jest.genMockFunction().mockReturnValue(Promise.resolve()),
      goToThanks: jest.genMockFunction(),
      cart: {
        items,
        remoteDataState: RemoteDataStates.LOADED
      }
    }
  })

  it('displays total price', () => {
    const rendered = shallow(<Cart {...props} />)
    
    expect(rendered.text()).toContain('Total: $400.00')
  })

  it('places order', (done) => {
    const rendered = shallow(<Cart {...props} />)

    rendered.instance().placeOrder({ preventDefault: () => {} }).then(() => {
      expect(props.placeOrder).toBeCalled()
      expect(props.goToThanks).toBeCalled()
      done();
    })
  })

})
