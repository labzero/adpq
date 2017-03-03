import React from 'react';
import {render, shallow} from 'enzyme'
import Header from 'components/Header/Header'
import HeaderDefault from 'components/Header/HeaderDefault'

it('knows to render the default menu', () => {
  const rendered = shallow(<Header headerMode="default" section="Hardware"/>)
  expect(rendered.text()).toContain('<Connect(HeaderDefault) />')
})

it('renders the default menu', () => {
  const rendered = shallow(<HeaderDefault section="Hardware"/>)
  expect(rendered.text()).toContain('Tech Shop')
  expect(rendered.text()).toContain('Cart')
  expect(rendered.text()).toContain('Account')
})

it('renders no menu when set to login', () => {
  const rendered = render(<Header headerMode="login" section="Hardware" />)
  expect(rendered.text()).toContain('Tech Shop')
  expect(rendered.text()).not.toContain('Logout')
})

it('renders admin menu when set to admin', () => {
  const rendered = render(<Header headerMode="admin" section="Hardware" />)
  expect(rendered.text()).toContain('Tech Shop Admin')
  expect(rendered.text()).toContain('Tech Shop Site')
  expect(rendered.text()).toContain('Logout')
  expect(rendered.text()).toContain('Orders')
  expect(rendered.text()).toContain('Catalog')
})

it('renders a cart count when passed in', () => {
  const rendered = shallow(<HeaderDefault cartCount={133} section="Hardware"/>)
  expect(rendered.text()).toContain('Cart 133')
})