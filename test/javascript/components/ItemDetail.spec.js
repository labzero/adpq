import React from 'react';
import {shallow} from 'enzyme'
import ItemDetail from 'components/ItemDetail'
import * as RemoteDataStates from 'constants/RemoteDataStates'

const item = {
  manufacturer: 'Dell',
  list_price: 10000,
  description: 'A Laptop'
}

const LOADING_INDICATOR = "Loading"
const NOT_FOUND_MESSAGE = "No such item"

it('renders item information if available', () => {
  const props = {
    item: item,
    catalog: {
      items: [item],
    remoteDataState: RemoteDataStates.LOADED
    }
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain('Dell')
  expect(rendered.text()).toContain('$100')
  expect(rendered.text()).toContain('A Laptop')
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

it('renders an error message if there is no item', () => {
  const props = {
    catalog: {
      items: [item],
    remoteDataState: RemoteDataStates.LOADED
    }
  }
  const rendered = shallow(<ItemDetail {...props}/>)
  expect(rendered.text()).toContain(NOT_FOUND_MESSAGE)
})
