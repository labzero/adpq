import React, { Component, PropTypes } from "react";
import { Link } from "react-router"
import * as RemoteDataStates from '../../constants/RemoteDataStates'
import Item from '../Item/Item';
import { applyFilters, applyRangeFilters } from '../../lib/filters'
import { generateQuery } from '../../lib/query'
import { sortBy } from '../../lib/sorts'
import map from 'lodash/fp/map'
import concat from 'lodash/fp/concat'
import uniq from 'lodash/fp/uniq'

export default class Category extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    category: PropTypes.object,
    fetchCatalog: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    rangeFilters: PropTypes.array.isRequired,
    sorts: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fetchCatalog();
  }

  sortedAndFilteredData = () => {
    const items = this.props.catalog.items
    const filters = concat([['top_level_category', [this.props.category.name]]], this.props.filters)
    
    return sortBy(
      this.props.sorts,
      applyRangeFilters(
        this.props.rangeFilters,
        applyFilters(
          filters, items)))
  }

  toggleFilter = (field, value) => (event) => {
    const { category, filters, push, sorts } = this.props;

    let filterFound = false;
    const newFilters = filters.reduce((acc, filter) => {
      if (filter[0] === field) {
        filterFound = true;
        const valueIndex = filter[1].indexOf(value.toLowerCase());
        if (valueIndex === -1) {
          acc.push([field, [...filter[1], value]]);
        } else if (filter[1].length > 1) {
          const filtersCopy = [...filter[1]];
          filtersCopy.splice(valueIndex, 1);
          acc.push([field, filtersCopy]);
        }
      } else {
        acc.push(filter);
      }
      return acc;
    }, []);

    if (!filterFound) {
      newFilters.push([field, [value]]);
    }

    push(`/category/${category.name}${generateQuery(sorts, newFilters)}`);
  };

  getFilterValues = (field) => {
    const { filters } = this.props;
    let fieldFilters = filters.find(filter => filter[0] === field);
    if (fieldFilters) {
      return fieldFilters[1];
    }
    return [];
  }

  renderFilterSection = (title, field) => {
    const { category } = this.props;
    const filterValues = this.getFilterValues(field);

    return (
      <div className="category-filter-section">
        <h3 className="category-filter-section-heading">{title}</h3>
        <ul className="usa-fieldset-inputs usa-unstyled-list">
          {category.fields[field].map(value => (<li key={value}>
            <input id={`${field}_${value}`} type="checkbox" checked={filterValues.indexOf(value.toLowerCase()) !== -1} onChange={this.toggleFilter(field, value)} />
            <label htmlFor="{`${field}_${value}`}">{value}</label>
          </li>))}
        </ul>
      </div>
    );
  }

  render() {
    const { filters, category } = this.props;
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      const items = this.sortedAndFilteredData();
      
      return (
        <div className="usa-grid">
          <div className="usa-section">
            <h2>{category.name}</h2>
          </div>
          <div className="usa-grid-full">
            <aside className="usa-width-one-fourth">
              <div className="category-count">{items.length} item{items.length === 1 ? '' : 's'}</div>
              {this.renderFilterSection('Categories', 'simple_category')}
              {this.renderFilterSection('Brands', 'manufacturer')}
            </aside>
            <main className="usa-width-three-fourths">
              <div className="category-sort-section">&nbsp;</div>
              <ul className="usa-unstyled-list">
                {items.map(item => <li className="category-item" key={item.id}><Item item={item} link={true} /></li>)}
              </ul>
            </main>
          </div>

          <div className="return-to-top"><a href="#top">Return to top</a></div>
        </div>
      )
    } else {
      return <div>Loading..</div>
    }
  }
};
