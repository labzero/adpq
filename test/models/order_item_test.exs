defmodule Adpq.OrderItemTest do
  use Adpq.ModelCase
  import Adpq.Factory

  alias Adpq.OrderItem

  @valid_attrs %{catalog_item_id: 42, order_id: 42, price: 42, quantity: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = OrderItem.changeset(%OrderItem{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = OrderItem.changeset(%OrderItem{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "from cart item creates a valid changeset" do
    catalog_item = insert(:catalog_item)
    cart_item = insert(:cart_item, %{catalog_item: catalog_item})
    order = insert(:order, %{user: cart_item.user})
    changeset = OrderItem.from_cart_item(order, cart_item)
    assert changeset.valid?
  end

  test "from cart item copies necessary data from the cart item" do
    catalog_item = insert(:catalog_item)
    cart_item = insert(:cart_item, %{catalog_item: catalog_item})
    order = insert(:order, %{user: cart_item.user})
    {:ok, order_item} = Repo.insert(OrderItem.from_cart_item(order, cart_item))
    assert order_item.price == catalog_item.list_price
    assert order_item.quantity == cart_item.quantity
    assert order_item.catalog_item_id == catalog_item.id
    assert order_item.order_id == order.id
  end
end
