import React from 'react';
import {shallow} from 'enzyme'
import Header from 'components/Header/Header'
import * as RemoteDataStates from 'constants/RemoteDataStates'

it('renders default menu', () => {
  const rendered = shallow(<Header navigationMode="default" section="Hardware" />)
  expect(rendered.text()).toContain('Tech Shop')
  expect(rendered.text()).toContain('Cart')
  expect(rendered.text()).toContain('Account')
  expect(rendered.find('Link').props().to).toEqual('logout')
})

it('renders no menu when set to none', () => {
  const rendered = shallow(<Header navigationMode="none" section="Hardware" />)
  expect(rendered.text()).toContain('Tech Shop')
})

it('renders admin menu when set to admin', () => {
  const rendered = shallow(<Header navigationMode="admin" section="Hardware" />)
  expect(rendered.text()).toContain('Tech Shop Admin')
  expect(rendered.text()).toContain('Tech Shop Site')
})
