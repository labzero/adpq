defmodule Adpq.Admin.OrderView do
  use Adpq.Web, :view

  alias Adpq.{ViewHelpers, OrderItemView}

  def render("index.json", %{orders: orders}) do
    render_many(orders, Adpq.Admin.OrderView, "order.json")
  end

  def render("show.json", %{order: order}) do
    render_one(order, Adpq.Admin.OrderView, "order.json")
  end

  def render("order.json", %{order: order}) do
    %{id: order.id,
      user_id: order.user_id,
      username: order.user.name,
      department: order.user.department,
      status: order.status,
      inserted_at: ViewHelpers.unix_timestamp(order.inserted_at),
      items: render_many(order.order_items, OrderItemView, "order_item.json")
    }
  end
end
