import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { default as formatCurrency } from "format-currency"

const CatalogListItem = ({ item }) => (
  <ul>
    <li>
      <Link to={`/item/${item.id}`}>
        {item.description}
      </Link>
    </li>
    <li>{item.manufacturer}</li>
    <li>{item.category}</li>
    <li>{formatCurrency(item.list_price / 100, { format: '%s%v', symbol: '$' })}</li>
  </ul>
);

CatalogListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default CatalogListItem;
