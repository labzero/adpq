import React from 'react';
import {shallow} from 'enzyme'
import Category from 'components/Category/Category'
import * as RemoteDataStates from 'constants/RemoteDataStates'

describe('<Category />', () => {
  let props, push;
  let catalog = {
    remoteDataState: RemoteDataStates.LOADED,
    items: [
      { id: 1, description: 'Laptop', manufacturer: 'Dell', list_price: 100000, top_level_category: 'stuff', simple_category: 'Ultralight' },
      { id: 2, description: 'Desktop', manufacturer: 'HP', list_price: 200000, top_level_category: 'stuff', simple_category: 'Workstation' }
    ],
    error: {}
  }

  beforeEach(() => {
    push = jest.fn();

    props = {
      catalog: catalog,
      category: {
        name: 'stuff',
        fields: {
          simple_category: [],
          manufacturer: []
        }
      },
      fetchCatalog: () => {},
      filters: [],
      push,
      rangeFilters: [],
      sorts: []
    };
  });

  it('renders an item for every item in the catalog', () => {
    const rendered = shallow(<Category { ...props }/>)
    expect(rendered.find('Item').length).toBe(2)
  })

  it('renders a loading message if the data is not loaded yet', () => {
    props.catalog = {
      remoteDataState: RemoteDataStates.LOADING,
      catalog
    };
    const rendered = shallow(<Category { ...props }/>)
    expect(rendered.text()).toContain('Loading')
  })

  it('goes to new url with filter after it is toggled', () => {
    const instance = shallow(<Category { ...props }/>).instance();

    instance.toggleFilter('simple_category', 'Ultralight')()

    expect(push.mock.calls[0][0]).toBe('/category/stuff?filter=simple_category:ultralight')
  })

  it('adds to existing filter after it is toggled', () => {
    props.filters = [['simple_category', ['workstation']]]

    const instance = shallow(<Category { ...props }/>).instance();

    instance.toggleFilter('simple_category', 'Ultralight')()

    expect(push.mock.calls[0][0]).toBe('/category/stuff?filter=simple_category:workstation,ultralight')
  })

  it('removes an existing filter after it is toggled', () => {
    props.filters = [['simple_category', ['workstation']]]

    const instance = shallow(<Category { ...props }/>).instance();

    instance.toggleFilter('simple_category', 'Workstation')()

    expect(push.mock.calls[0][0]).toBe('/category/stuff')
  })

  it('goes to new url with two different filters after one is toggled', () => {
    props.filters = [['manufacturer', ['dell']]]

    const instance = shallow(<Category { ...props }/>).instance();

    instance.toggleFilter('simple_category', 'Ultralight')()

    expect(push.mock.calls[0][0]).toBe('/category/stuff?filter=manufacturer:dell&filter=simple_category:ultralight')
  })
});
