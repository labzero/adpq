import React from "react";
import { IndexLink } from "react-router"
import * as RemoteDataStates from '../../constants/RemoteDataStates'
import CatalogListItem from '../CatalogListItem/CatalogListItem'
import RecommendedItems from '../RecommendedItems/RecommendedItems'
import { applyFilters, applyRangeFilters } from '../../lib/filters'
import { sortBy } from '../../lib/sorts'
import map from 'lodash/fp/map'
import uniq from 'lodash/fp/uniq'

export default class Homepage extends React.Component {

  componentDidMount() {
    this.props.fetchCatalog();
  }

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      return (
        <div className="homepage">
          
          <div className="usa-grid usa-section">
            <h2>Desktop or laptop?</h2>
            <p className="subheading">Options and pricing for every hardware need.</p>
          </div>

          <div className="usa-grid">
            <h3 className="subsection">Popular Configurations</h3>

            <RecommendedItems
                title="Everyday Computing"
                subtitle="Good all-around systems for most business tasks."
                items={[
                  {id: 1, top_level_category: 'Desktop', description: 'Dell Optiplex 3040 MT', image: '/images/placeholder-01.jpg'},
                  {id: 2, top_level_category: 'Laptop', description: 'HP Power Laptop 600 G2 SFF Business PC', image: '/images/placeholder-01.jpg'}
                ]} />

            <RecommendedItems
                title="Powerhouse"
                subtitle="Performance systems that can handle intensive tasks."
                items={[
                  {id: 1, top_level_category: 'Desktop', description: 'Dell Precision T5810', image: '/images/placeholder-01.jpg'},
                  {id: 2, top_level_category: 'Laptop', description: 'ZBook15 Studio Mobile Workstation', image: '/images/placeholder-01.jpg'}
                ]} />

            <RecommendedItems
                title="Great for Travel"
                subtitle="Lightweight, secure, premium laptop with extended warranty."
                items={[
                  {id: 1, top_level_category: 'Laptop', description: 'Dell Latitude E7270', image: '/images/placeholder-01.jpg'},
                ]} />

            <RecommendedItems
                title="Thin Client"
                subtitle="An integrated solution combining security and easy management."
                items={[
                  {id: 2, top_level_category: 'Desktop', description: 'HP T620 Flexible Series', image: '/images/placeholder-01.jpg'}
                ]} />

          </div>

        </div>
      )
    } else {
      return <div className="loading">Loading..</div>
    }
  }
};
