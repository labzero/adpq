defmodule Adpq.Admin.OrderController do
  use Adpq.Web, :controller
  use PhoenixSwagger

  alias Adpq.{Order, Order.Status, OrderQueries, User.Department}

  swagger_path :index do
    get "/api/admin/orders"
    tag "Admin Order"
    description "List orders"
    produces "application/json"
    response 200, "OK", Schema.ref(:Order)
    response 404, "Not Found"
  end

  def index(conn, _params) do
    orders = Repo.all(OrderQueries.orders_with_items)
    render(conn, "index.json", orders: orders)
  end

  swagger_path :show do
    get "/api/admin/orders/{id}"
    tag "Admin Order"
    description "Show an individual order"
    parameter "id", :path, :integer, "Order ID", required: true
    response 200, "OK", Schema.ref(:Order)
    response 404, "Not Found"
  end

  def show(conn, %{"id" => id}) do
    order = Repo.one!(OrderQueries.find_with_items(id))
    render(conn, "show.json", order: order)
  end

  swagger_path :update do
    put "/api/admin/orders/{id}"
    description "Update the status of an order"
    tag "Admin Order"
    parameters do
      id :path, :integer, "Order ID", required: true
      body :body, :object, "Status", required: true, schema: Schema.ref(:OrderStatusUpdate)
    end
    response 200, "OK", Schema.ref(:Order)
    response 404, "Not Found"
    response 422, "Unprocessable Entity"
  end

  def update(conn, %{"id" => id, "status" => status}) do
    order = Repo.get!(Order, id)
    changeset = Order.status_update_changeset(order, %{status: status})
    case Repo.update(changeset) do
      {:ok, order} ->
        order_with_items = Repo.one(OrderQueries.find_with_items(order.id))
        conn
        |> put_resp_header("location", admin_order_path(conn, :show, order))
        |> render("show.json", order: order_with_items)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def swagger_definitions do
    %{
      OrderItem: swagger_schema do
        title "OrderItem"
        description "An order line item"
        properties do
          id :string, "Item ID", required: true
          price :integer, "Total Price", required: true
          quantity :integer, "Quantity", required: true
          name :string, "Item Name", required: true
          sku :string, "SKU / OEM part number", required: true
          manufacturer :string, "Manufacturer Name", required: true
        end
      end,
      Order: swagger_schema do
        title "Order"
        description "A Customer Order"
        properties do
          id :string, "Order ID", required: true
          user_id :string, "User ID", required: true
          status :string, "Order Status", required: true, enum: Status.list
          items array(:OrderItem), "Items", required: true
          department :string, "Department", required: true, enum: Department.all
        end
      end,
      OrderStatusUpdate: swagger_schema do
        title "Order Status Update"
        property "status", :string, "Status", required: true, enum: Status.list
      end
    }
  end
end
