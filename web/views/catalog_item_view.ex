defmodule Adpq.CatalogItemView do
  use Adpq.Web, :view

  def render("index.json", %{catalog_items: catalog_items}) do
    %{data: render_many(catalog_items, Adpq.CatalogItemView, "catalog_item.json")}
  end

  def render("show.json", %{catalog_item: catalog_item}) do
    %{data: render_one(catalog_item, Adpq.CatalogItemView, "catalog_item.json")}
  end

  def render("catalog_item.json", %{catalog_item: catalog_item}) do
    %{id: catalog_item.id,
      clin: catalog_item.clin,
      unspc: catalog_item.unspc,
      name: catalog_item.name,
      manufacturer: catalog_item.manufacturer,
      sku: catalog_item.sku,
      description: catalog_item.description,
      unit_of_measure: catalog_item.unit_of_measure,
      quantity_in_uom: catalog_item.quantity_in_uom,
      list_price: catalog_item.list_price,
      contract_unit_price: catalog_item.contract_unit_price,
      contract_discount: catalog_item.contract_discount,
      simple_category: catalog_item.simple_category,
      top_level_category: catalog_item.top_level_category}
  end
end
