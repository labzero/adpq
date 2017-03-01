defmodule Adpq.CartItemView do
  use Adpq.Web, :view

  def render("index.json", %{cart_items: cart_items}) do
    render_many(cart_items, Adpq.CartItemView, "cart_item.json")
  end

  def render("show.json", %{cart_item: cart_item}) do
    render_one(cart_item, Adpq.CartItemView, "cart_item.json")
  end

  def render("cart_item.json", %{cart_item: cart_item}) do
    catalog_item = cart_item.catalog_item
    %{
      id: cart_item.id,
      user_id: cart_item.user_id,
      quantity: cart_item.quantity,
      name: catalog_item.name,
      price: catalog_item.list_price,
      manufacturer: catalog_item.manufacturer,
      sku: catalog_item.sku
    }
  end
end
