import React from 'react';
import {render, shallow} from 'enzyme'
import Header from 'components/Header/Header'
import * as RemoteDataStates from 'constants/RemoteDataStates'

it('renders default menu', () => {
  const rendered = render(<Header headerMode="default" section="Hardware" />)
  expect(rendered.text()).toContain('Tech Shop')
  expect(rendered.text()).toContain('Cart')
  expect(rendered.text()).toContain('Account')
  expect(rendered.text()).toContain('Logout')
  expect(rendered.text()).toContain('Hardware')
  expect(rendered.text()).toContain('Software')
  expect(rendered.text()).toContain('Services')
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
