import React from "react";
import * as RemoteDataStates from '../constants/RemoteDataStates'
import { CatalogListItem } from './CatalogListItem'
import map from 'lodash/fp/map'
import uniq from 'lodash/fp/uniq'


export default class Homepage extends React.Component {

  componentWillMount() {
    this.props.fetchCatalog();
  }

  render() {
    const items = this.props.catalog.items
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      return (
        <ul>
          {map(item => (<li key={item.id}><CatalogListItem item={item}/></li>), items)}
        </ul>
      )
    } else {
      return <div>Loading..</div>
    }
  }
};
