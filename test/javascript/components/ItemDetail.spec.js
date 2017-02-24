import React from 'react';
import {shallow} from 'enzyme'
import ItemDetail from 'components/ItemDetail/ItemDetail'
import * as RemoteDataStates from 'constants/RemoteDataStates'

const item = {
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
    manufacturer: 'DELL',
    sku: 'A-BCD',
    catalog: {
      items: [item],
    remoteDataState: RemoteDataStates.LOADED
    }
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain('DELL')
  expect(rendered.text()).toContain('$100')
  expect(rendered.text()).toContain('4GB 1DIMM')
  expect(rendered.text()).not.toContain('DDR3L, Windows') // make sure we're splitting our description
})

it('renders a loading indicator if data is not yet loaded', () => {
  const props = {
    catalog: {
      remoteDataState: RemoteDataStates.LOADING
    }
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain(LOADING_INDICATOR)
})

/*
TODO: Turn this back on after the sample data is removed
it('renders an error message if there is no item', () => {
  const props = {
    manufacturer: 'HP',
    sku: 'D-457',
    catalog: {
      items: [item],
    remoteDataState: RemoteDataStates.LOADED
    }
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain(NOT_FOUND_MESSAGE)
})
*/
