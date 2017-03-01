import React, { Component, PropTypes } from 'react';
import map from 'lodash/fp/map';
import * as RemoteDataStates from '../../../constants/RemoteDataStates';
import { sortBy } from '../../../lib/sorts';


export default class Catalog extends Component {

  static propTypes = {
    fetchCatalog: PropTypes.func.isRequired,
    catalog: PropTypes.shape({
      remoteDataState: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired,
    })
  };

  state = {
    sort: ['clin', 'desc']
  }

  componentDidMount() {
    this.props.fetchCatalog();
  }

  toggleSort = () => {
    const [field, direction] = this.state.sort;
    return [field, direction === 'asc' ? 'desc' : 'asc'];
  }

  changeSort = (field) => {
    const [currentField, _currentDirection] = this.state.sort;
    const newState = (currentField === field) ? this.toggleSort() : [field, 'asc'];
    this.setState({ sort: newState });
  }

  sortedData = () => {
    const items = this.props.catalog.items;
    return sortBy([this.state.sort], items);
  }

  renderTableHeader = () => (
    <tr key="header">
      <th onClick={() => this.changeSort('clin')}>CLIN</th>
      <th onClick={() => this.changeSort('updated_at')}>Date Added</th>
      <th onClick={() => this.changeSort('name')}>Item Name</th>
      <th onClick={() => this.changeSort('manufacturer')}>Manufacturer</th>
      <th onClick={() => this.changeSort('sku')}>SKU</th>
      <th onClick={() => this.changeSort('contract_unit_price')}>Contract Price</th>
      <th onClick={() => this.changeSort('top_level_category')}>Top Level</th>
      <th onClick={() => this.changeSort('simple_category')}>Sub-Category</th>
    </tr>
  )

  renderTableRow = item => (
    <tr key={item.id}>
      <td>{item.clin}</td>
      <td>{new Date(item.updated_at * 1000).toLocaleString()}</td>
      <td>{item.name}</td>
      <td>{item.manufacturer}</td>
      <td>{item.sku}</td>
      <td>{item.contract_unit_price}</td>
      <td>{item.top_level_category}</td>
      <td>{item.simple_category}</td>
    </tr>
  )

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      const data = this.sortedData(this.props.catalog.items);
      const tableRows = map(item => this.renderTableRow(item), data);
      return (
        <div>
          <table>
            <thead>
              {this.renderTableHeader()}
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      );
    }
    return <div>Loading..</div>;
  }
}
