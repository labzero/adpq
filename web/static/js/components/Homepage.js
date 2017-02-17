import React from "react";
import * as RemoteDataStates from '../constants/RemoteDataStates'
import { Table } from 'reactable'
import map from 'lodash/fp/map'

export default class Homepage extends React.Component {

  componentWillMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      return <div> Catalog: {JSON.stringify(this.props.catalog.items)} </div>
    } else {
      return <div>Loading..</div>
    }
  }
};
