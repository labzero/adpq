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
        <div className="usa-grid homepage">
          
          <div className="usa-section">
            <h2>Desktop or laptop?</h2>
            <p className="subheading">Options and pricing for every hardware need.</p>
          </div>

          <div>
            <h3 className="subsection">Popular Configurations</h3>

            <RecommendedItems
                title="Everyday Computing"
                subtitle="Good all-around systems for most business tasks."
                items={[
                  {id: 1, top_level_category: 'Laptop', name: 'HP Power Laptop 600 G2 SFF Business PC', image: '/images/products/everyday-computing-hp-laptop.jpg'},
                  {id: 2, top_level_category: 'Desktop', name: 'Dell Optiplex 3040 MT', image: '/images/products/everyday-computing-dell-desktop.jpg'}
                ]} />

            <RecommendedItems
                title="Powerhouse"
                subtitle="Performance systems that can handle intensive tasks."
                items={[
                  {id: 3, top_level_category: 'Laptop', name: 'ZBook15 Studio Mobile Workstation', image: '/images/products/powerhouse-hp-laptop.jpg'},
                  {id: 4, top_level_category: 'Desktop', name: 'Dell Precision T5810', image: '/images/products/powerhouse-dell-desktop.jpg'}
                ]} />

            <RecommendedItems
                title="Great for Travel"
                subtitle="Lightweight, secure, premium laptop with extended warranty."
                items={[
                  {id: 1, top_level_category: 'Laptop', name: 'Dell Latitude E7270', image: '/images/products/travel-dell.jpg'}
                ]} />

            <RecommendedItems
                title="Thin Client"
                subtitle="An integrated solution combining security and easy management."
                items={[
                  {id: 2, top_level_category: 'Desktop', name: 'HP T620 Flexible Series', image: '/images/products/thin-client-hp.jpg'}
                ]} />

          </div>

          <div className="return-to-top"><a href="#top">Return to top</a></div>
        </div>
      )
    } else {
      return <div className="loading">Loading..</div>
    }
  }
};
