import React, { Component, PropTypes } from 'react';
import concat from 'lodash/fp/concat';
import CatalogItemContainer from '../CatalogItem/CatalogItemContainer';
import Loading from '../Loading/Loading';
import { applyFilters, applyRangeFilters } from '../../lib/filters';
import { generateQuery } from '../../lib/query';
import { shouldRender } from '../../lib/remote_data_states';
import { sortBy } from '../../lib/sorts';

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

  state = {
    toggleFiltersLink: {
      text: 'Show Filters',
      visibility: 'hidden'
    },
    toggleDetailsLink: {
      text: 'Hide Details',
      visibility: 'show'
    }
  }

  componentDidMount() {
    this.props.fetchCatalog();
  }

  getFilterValues = (field) => {
    const { filters } = this.props;
    const fieldFilters = filters.find(filter => filter[0] === field);
    if (fieldFilters) {
      return fieldFilters[1];
    }
    return [];
  };

  toggleFilter = (field, value) => (_event) => {
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

  changeSort = (event) => {
    const { category, filters, push } = this.props;

    const value = event.target.value;
    const newSorts = [];
    if (value) {
      const parts = value.split(':');
      newSorts.push(parts);
    }

    push(`/category/${category.name}${generateQuery(newSorts, filters)}`);
  }

  toggleFilterVisibility = (_event) => {
    if (this.state.toggleFiltersLink.visibility === 'hidden') {
      this.setState({ toggleFiltersLink: { text: 'Hide Filters', visibility: 'show' } });
    } else {
      this.setState({ toggleFiltersLink: { text: 'Show Filters', visibility: 'hidden' } });
    }
  };

  toggleDetailVisibility = (_event) => {
    if (this.state.toggleDetailsLink.visibility === 'hidden') {
      this.setState({ toggleDetailsLink: { text: 'Hide Details', visibility: 'show' } });
    } else {
      this.setState({ toggleDetailsLink: { text: 'Show Details', visibility: 'hidden' } });
    }
  };

  sortedAndFilteredData = () => {
    const items = this.props.catalog.items;
    const filters = concat([['top_level_category', [this.props.category.name]]], this.props.filters);

    return sortBy(
      this.props.sorts,
      applyRangeFilters(
        this.props.rangeFilters,
        applyFilters(
          filters, items)));
  }

  renderFilterSection = (title, field) => {
    const { category } = this.props;
    const filterValues = this.getFilterValues(field);

    return (
      <div className="category-filter-section">
        <h2 className="category-filter-section-heading">{title}</h2>
        <ul className="usa-fieldset-inputs usa-unstyled-list">
          {category.fields[field].map(value => (<li key={value}>
            <input id={`${field}_${value}`} type="checkbox" checked={filterValues.indexOf(value.toLowerCase()) !== -1} onChange={this.toggleFilter(field, value)} />
            <label htmlFor={`${field}_${value}`}>{value}</label>
          </li>))}
        </ul>
      </div>
    );
  }

  render() {
    const { category, catalog, sorts } = this.props;

    if (shouldRender(catalog.remoteDataState)) {
      const items = this.sortedAndFilteredData();

      return (
        <div className="usa-grid">
          <div className="usa-section">
            <h1>{category.name}</h1>
          </div>
          <div className="usa-grid-full">
            <aside className="usa-width-one-fourth">
              <div className="category-count">
                {items.length} item{items.length === 1 ? '' : 's'}
                <span className="category-toggle-filters">
                  <button className="usa-button-unstyled" onClick={this.toggleFilterVisibility}>{this.state.toggleFiltersLink.text}</button>
                </span>
              </div>
              <div className={`category-filter-sections category-filter-sections-${this.state.toggleFiltersLink.visibility}`}>
                {this.renderFilterSection('Categories', 'simple_category')}
                {this.renderFilterSection('Brands', 'manufacturer')}
              </div>
            </aside>
            <main className="usa-width-three-fourths">
              <div className="category-sort-section usa-grid-full">
                <div className="usa-width-seven-twelfths category-toggle-details">
                  <button className="usa-button-unstyled" onClick={this.toggleDetailVisibility}>{this.state.toggleDetailsLink.text}</button>
                </div>
                <div className="category-sort usa-width-five-twelfths usa-grid-full">
                  <label htmlFor="category-sort-select" className="usa-width-one-fourth category-sort-label">
                    Sort by:
                  </label>
                  <div className="usa-width-three-fourths">
                    <select id="category-sort-select" onChange={this.changeSort} value={sorts.length ? `${sorts[0][0]}:${sorts[0][1]}` : undefined}>
                      <option />
                      <option value="contract_unit_price:asc">Price (lowest to highest)</option>
                      <option value="contract_unit_price:desc">Price (highest to lowest)</option>
                      <option value="manufacturer:asc">Manufacturer (A-Z)</option>
                      <option value="manufacturer:desc">Manufacturer (Z-A)</option>
                      <option value="simple_category:asc">Category (A-Z)</option>
                      <option value="simple_category:desc">Category (Z-A)</option>
                    </select>
                  </div>
                </div>
              </div>
              <ul className={`usa-unstyled-list category-item-details-${this.state.toggleDetailsLink.visibility}`}>
                {items.map(item => <li className="category-item" key={item.id}><CatalogItemContainer item={item} link /></li>)}
              </ul>
            </main>
          </div>

          <div className="return-to-top"><a href="#top">Return to top</a></div>
        </div>
      );
    }
    return <Loading />;
  }
}
