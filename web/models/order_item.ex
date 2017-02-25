defmodule Adpq.OrderItem do
  use Adpq.Web, :model

  alias Adpq.{Order, CartItem, CatalogItem}

  @moduledoc """
    An order line item
  """

  schema "order_items" do
    belongs_to :order, Adpq.Order
    belongs_to :catalog_item, Adpq.CatalogItem
    field :quantity, :integer
    field :price, :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:order_id, :catalog_item_id, :quantity, :price])
    |> validate_required([:order_id, :catalog_item_id, :quantity, :price])
  end

  def from_cart_item(%Order{} = order, %CartItem{catalog_item: %CatalogItem{} = catalog_item} = cart_item) do
    params = %{
      order_id: order.id,
      catalog_item_id: catalog_item.id,
      quantity: cart_item.quantity,
      price: catalog_item.list_price
    }
    changeset(%Adpq.OrderItem{}, params)
  end
end
