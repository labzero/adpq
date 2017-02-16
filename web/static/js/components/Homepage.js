import React from "react";
import * as RemoteDataStates from '../constants/RemoteDataStates'
import { Table } from 'reactable'
import map from 'lodash/fp/map'

export default class Homepage extends React.Component {

  componentWillMount() {
    this.props.fetchCatalog();
  }

  pluckData(items) {
    return map((network) => network.location, items.networks)
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      let data = this.pluckData(this.props.catalog.items)
      return <div> Catalog: {JSON.stringify(data)} </div>
    } else {
      return <div>Loading..</div>
    }
  }
};
