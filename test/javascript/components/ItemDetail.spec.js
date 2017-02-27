import React from 'react';
import {shallow} from 'enzyme'
import ItemDetail from 'components/ItemDetail/ItemDetail'
import * as RemoteDataStates from 'constants/RemoteDataStates'

const item = {
  id: 0,
  name: ' Dell Optiplex 3040 MT',
  manufacturer: 'DELL',
  sku: '210-AFXL',
  list_price: 10000,
  image: '/images/products/everyday-computing-dell-desktop.jpg',
  description: "4GB 1DIMM 1600MHz DDR3L, Windows 7 Pro (32/64 bit), integrated Intel HD Graphics, DVD+/- RW, 500GB SATA 7200rpm, USB Optical Wheel Mouse, USB Keyboard, 3-Year Next Business Day On-Site Warranty",
}

const LOADING_INDICATOR = "Loading"
const NOT_FOUND_MESSAGE = "No such item"

it('renders item information if available', () => {
  const props = {
    item,
    catalog: {
      items: [item],
      remoteDataState: RemoteDataStates.LOADED
    },
    fetchCatalog: function() {}
  }
  const rendered = shallow(<ItemDetail {...props} />)
  expect(rendered.find('Item').length).toBe(1)
})

it('renders a loading indicator if data is not yet loaded', () => {
  const props = {
    catalog: {
      remoteDataState: RemoteDataStates.LOADING
    },
    item: {},
    fetchCatalog: function() {}
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain(LOADING_INDICATOR)
})

it('renders an error message if there is no item', () => {
  const props = {
    item: null,
    catalog: {
      remoteDataState: RemoteDataStates.LOADED
    },
    fetchCatalog: function() {}
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain(NOT_FOUND_MESSAGE)
})
