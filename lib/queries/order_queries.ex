defmodule Adpq.OrderQueries do
  import Ecto.Query

  @moduledoc """
    Ecto queries related to orders
  """

  def user_scope(user_id) do
    where(Adpq.User, [users], users.id == ^user_id)
  end

  def load_user_order(user_id, id) do
    user_id
      |> user_scope
      |> with_order_items
      |> where([users, orders, order_items, catalog_items], orders.id == ^id)
  end

  def with_order_items(query) do
    query
    |> join(:left, [users], orders in assoc(users, :orders))
    |> join(:left, [users, orders], order_items in assoc(orders, :order_items))
    |> join(:left, [users, orders, order_items], catalog_item in assoc(order_items, :catalog_item))
    |> preload(
        [users, orders, order_items, catalog_items],
        [orders: {orders, order_items: {order_items, catalog_item: catalog_items}}]
      )
  end

  def with_cart_items(query) do
    query
    |> join(:left, [users], cart_items in assoc(users, :cart_items))
    |> join(:left, [users, cart_items], catalog_item in assoc(cart_items, :catalog_item))
    |> preload(
        [users, cart_items, catalog_items],
        [cart_items: {cart_items, catalog_item: catalog_items}]
      )
  end

end
