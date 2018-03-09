defmodule AdpqWeb.CartItemView do
  use Adpq.Web, :view

  alias AdpqWeb.CartItemView

  def render("index.json", %{cart_items: cart_items}) do
    render_many(cart_items, CartItemView, "cart_item.json")
  end

  def render("show.json", %{cart_item: cart_item}) do
    render_one(cart_item, CartItemView, "cart_item.json")
  end

  def render("cart_item.json", %{cart_item: cart_item}) do
    catalog_item = cart_item.catalog_item
    %{
      id: cart_item.id,
      user_id: cart_item.user_id,
      quantity: cart_item.quantity,
      manufacturer: catalog_item.manufacturer,
      sku: catalog_item.sku,
      name: catalog_item.name,
      price: catalog_item.contract_unit_price,
      manufacturer: catalog_item.manufacturer,
      simple_category: catalog_item.simple_category,
      top_level_category: catalog_item.top_level_category
    }
  end
end
