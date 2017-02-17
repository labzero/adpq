import React from 'react';
import {shallow} from 'enzyme'
import Homepage from 'components/Homepage'
import CatalogListItem from 'components/CatalogListItem'
import * as RemoteDataStates from 'constants/RemoteDataStates'

describe('<Homepage/>', () => {
  let props;

  let catalog = {
    remoteDataState: RemoteDataStates.LOADED,
    items: [
      { id: 1, description: 'Laptop', manufacturer: 'Dell', list_price: 100000 },
      { id: 2, description: 'Desktop', manufacturer: 'HP', list_price: 200000 }
    ],
    sorts: [],
    filters: [],
    rangeFilters: [],
    error: {}
  }
  beforeEach(() => {
    props = {
      catalog: catalog
    };
  });

  it('renders a catalog list item for every item in the catalog', () => {
    const rendered = shallow(<Homepage { ...props }/>)
    expect(rendered.find('CatalogListItem').length).toBe(2)
  })

  it('renders a loading message if the data is not loaded yet', () => {
    let loadingProps = {
      catalog: {
        remoteDataState: RemoteDataStates.LOADING,
        catalog
      }
    }
    const rendered = shallow(<Homepage { ...loadingProps }/>)
    expect(rendered.text()).toContain('Loading')
  })
});
