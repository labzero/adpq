import React from 'react'
import { Link } from 'react-router'
import { default as formatCurrency } from "format-currency"

export const CatalogListItem = ({ item }) => (
    <ul>
      <li>
        <Link to={`/item/${item.id}`}>
          {item.description}
        </Link>
      </li>
      <li>{item.manufacturer}</li>
      <li>{formatCurrency(item.list_price / 100, { format: '%s%v', symbol: '$' })}</li>
    </ul>
)
