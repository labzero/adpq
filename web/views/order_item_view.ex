defmodule Adpq.OrderItemView do
  use Adpq.Web, :view

  def render("order_item.json", %{order_item: order_item}) do
    %{
      id: order_item.id,
      price: order_item.price,
      quantity: order_item.quantity,
      name: order_item.catalog_item.name,
      manufacturer: order_item.catalog_item.manufacturer,
      sku: order_item.catalog_item.sku,
    }
  end
end
