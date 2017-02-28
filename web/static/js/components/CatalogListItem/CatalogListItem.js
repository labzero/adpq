import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import currencyFormatter from 'currency-formatter';

const CatalogListItem = ({ item }) => (
  <ul>
    <li>
      <Link to={`/item/${item.id}`}>
        {item.description}
      </Link>
    </li>
    <li>{item.manufacturer}</li>
    <li>{item.category}</li>
    <li>{currencyFormatter.format(item.list_price / 100, { code: 'USD' })}</li>
  </ul>
);

CatalogListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default CatalogListItem;
