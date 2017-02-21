import React from 'react';
import {render, mount, shallow} from 'enzyme'
import CatalogListItem from 'components/CatalogListItem/CatalogListItem'

const item = {
  id: 1,
  list_price: 1000,
  manufacturer: 'HP',
  description: 'A Workstation'
}

let rendered;

beforeEach(() => {
  rendered = render(<CatalogListItem item={item}/>)
})

it('renders the list price', () => {
  expect(rendered.text()).toContain('$10.00')
})

it('renders the manufacturer', () => {
  expect(rendered.text()).toContain('HP')
})

it('renders the description', () => {
  expect(rendered.text()).toContain('A Workstation')
})

it('links to the item details', () => {
  const shallowRendered = shallow(<CatalogListItem item={item}/>)
  expect(shallowRendered.find('Link').prop('to')).toEqual('/item/1')
})
