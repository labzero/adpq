import React from 'react'
import { default as formatCurrency } from "format-currency"

export const CatalogListItem = ({ item }) => (
    <ul>
      <li>{item.description}</li>
      <li>{item.manufacturer}</li>
      <li>{formatCurrency(item.list_price / 100, { format: '%s%v', symbol: '$' })}</li>
    </ul>
)
