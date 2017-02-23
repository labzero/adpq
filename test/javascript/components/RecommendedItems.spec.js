import React from 'react';
import {render, shallow} from 'enzyme'
import RecommendedItems from 'components/RecommendedItems/RecommendedItems'
import * as RemoteDataStates from 'constants/RemoteDataStates'

const example = {
  title: 'Test title',
  subtitle: 'Test subtitle',
  items: [
    {
      id: 1,
      top_level_category: 'Laptop',
      description: 'ZBook15',
      image: '/images/placeholder-01.jpg'
    },{
      id: 2,
      top_level_category: 'Desktop',
      description: 'Workstation',
      image: '/images/placeholder-01.jpg'
    }
  ]
}

it('renders a basic set of recommendations', () => {

  const rendered = render(<RecommendedItems title={example.title} subtitle={example.subtitle} items={example.items} />)

  expect(rendered.text()).toContain('Test title')
  expect(rendered.text()).toContain('Test subtitle')
  expect(rendered.text()).toContain('ZBook15')
  expect(rendered.text()).toContain('Workstation')
  expect(rendered.text()).toContain('Laptop')
  expect(rendered.text()).toContain('Desktop')
})

it('renders without a title', () => {

  const rendered = render(<RecommendedItems subtitle={example.subtitle} items={example.items} />)

  expect(rendered.text()).toContain('Test subtitle')
  expect(rendered.text()).toContain('ZBook15')
  expect(rendered.text()).toContain('Workstation')
  expect(rendered.text()).toContain('Laptop')
  expect(rendered.text()).toContain('Desktop')
})

it('renders without a sutitle', () => {

  const rendered = render(<RecommendedItems items={example.items} />)

  expect(rendered.text()).toContain('ZBook15')
  expect(rendered.text()).toContain('Workstation')
  expect(rendered.text()).toContain('Laptop')
  expect(rendered.text()).toContain('Desktop')
})

it('renders without items', () => {

  const rendered = render(<RecommendedItems subtitle={example.subtitle} />)

  expect(rendered.text()).toContain('Test subtitle')
})
