import React from "react";
import { IndexLink } from "react-router"
import * as RemoteDataStates from '../constants/RemoteDataStates'
import { CatalogListItem } from './CatalogListItem'
import { applyFilters, applyRangeFilters } from '../lib/filters'
import { sortBy } from '../lib/sorts'
import map from 'lodash/fp/map'
import uniq from 'lodash/fp/uniq'


export default class Homepage extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      return (
        <div>
          Homepage content here..
        </div>
      )
    } else {
      return <div>Loading..</div>
    }
  }
};
