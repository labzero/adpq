import React from 'react';
import {shallow} from 'enzyme'
import Header from 'components/Header/Header'
import * as RemoteDataStates from 'constants/RemoteDataStates'

it('renders the basic menu when logged in', () => {
  const rendered = shallow(<Header isAuthorized={true} section="Hardware" />)
  expect(rendered.text()).toContain('Cart')
  expect(rendered.text()).toContain('Account')
  expect(rendered.find('Link').props().to).toEqual('logout')
})

it('renders no menu when logged out', () => {
  const rendered = shallow(<Header isAuthorized={false} section="Hardware" />)
  expect(rendered.text()).not.toContain('Cart')
})