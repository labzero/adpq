import React from 'react';
import {shallow} from 'enzyme'
import Header from 'components/Header/Header'
import * as RemoteDataStates from 'constants/RemoteDataStates'

it('renders the basic menu', () => {
  const rendered = shallow(<Header />)
  expect(rendered.text()).toContain('Cart')
  expect(rendered.text()).toContain('Account')
  expect(rendered.text()).toContain('Logout')
})
