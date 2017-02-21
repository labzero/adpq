import React from 'react';
import {shallow} from 'enzyme'
import Category from 'components/Category/Category'
import * as RemoteDataStates from 'constants/RemoteDataStates'

describe('<Category />', () => {
  let props;

  let catalog = {
    remoteDataState: RemoteDataStates.LOADED,
    items: [
      { id: 1, description: 'Laptop', manufacturer: 'Dell', list_price: 100000, category: 'stuff' },
      { id: 2, description: 'Desktop', manufacturer: 'HP', list_price: 200000, category: 'stuff' }
    ],
    error: {}
  }
  beforeEach(() => {
    props = {
      catalog: catalog,
      category: 'stuff',
      filters: []
    };
  });

  it('renders a catalog list item for every item in the catalog', () => {
    const rendered = shallow(<Category { ...props }/>)
    expect(rendered.find('CatalogListItem').length).toBe(2)
  })

  it('renders a loading message if the data is not loaded yet', () => {
    let loadingProps = {
      catalog: {
        remoteDataState: RemoteDataStates.LOADING,
        catalog
      },
      category: 'stuff',
      filters: []
    }
    const rendered = shallow(<Category { ...loadingProps }/>)
    expect(rendered.text()).toContain('Loading')
  })
});
