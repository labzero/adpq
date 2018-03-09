defmodule AdpqWeb.Admin.OrderView do
  use Adpq.Web, :view

  alias AdpqWeb.OrderView

  def render("index.json", %{orders: orders}) do
    render_many(orders, AdpqWeb.Admin.OrderView, "order.json")
  end

  def render("show.json", %{order: order}) do
    render_one(order, AdpqWeb.Admin.OrderView, "order.json")
  end

  def render("order.json", %{order: order}) do
    OrderView.render("order.json", %{order: order})
  end
end
