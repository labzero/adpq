defmodule Adpq.OrderController do
  use Adpq.Web, :controller
  use PhoenixSwagger

  import Adpq.OrderQueries
  alias Adpq.{Order, OrderItem, User, ErrorView, Order.Status}

  swagger_path :index do
    get "/api/user/{user_id}/orders"
    description "List orders for a user"
    produces "application/json"
    parameter "user_id", :path, :integer, "User ID", required: true, example: 22
    response 200, "OK", Schema.ref(:Order)
    response 404, "Not Found"
  end

  def index(conn, %{"user_id" => user_id}) do
    user =
      user_id
      |> user_scope
      |> with_order_items
      |> Repo.one!
    render(conn, "index.json", orders: user.orders)
  end

  swagger_path :create do
    post "/api/user/{user_id}/orders"
    description "Create an order from a users current cart"
    parameter "user_id", :path, :integer, "User ID", required: true, example: 22
    produces "application/json"
    response 200, "OK", Schema.ref(:Order)
    response 422, "Empty Cart"
  end

  def create(conn, %{"user_id" => user_id}) do
    # load cart items
    user =
      user_id
      |> user_scope
      |> with_cart_items
      |> Repo.one!
    case user.cart_items do
      [] ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ErrorView, "error.json", %{message: "Empty Cart"})
      _ ->
        # create order
        order =
          %Order{}
          |> Order.changeset(%{user_id: user_id, status: Status.submitted})
          |> Repo.insert!
        # move cart items into order
        Enum.map(user.cart_items, fn ci -> Repo.insert!(OrderItem.from_cart_item(order, ci)) end)
        # reload and render
        order = Repo.preload(order, [{:order_items, [:catalog_item]}])
        conn
        |> put_status(:created)
        |> put_resp_header("location", user_order_path(conn, :show, user.id, order))
        |> render("show.json", order: order)
      end
  end

  swagger_path :show do
    get "/api/user/{user_id}/orders/{id}"
    description "Show an individual order"
    parameters do
      user_id :path, :integer, "User ID", required: true, example: 22
      id :path, :integer, "Order ID", required: true
    end
    response 200, "OK", Schema.ref(:Order)
    response 404, "Not Found"
  end

  def show(conn, %{"user_id" => user_id, "id" => id}) do
    case Repo.one!(load_user_order(user_id, id)) do
      %User{orders: [order | _]} -> render(conn, "show.json", order: order)
      _ ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(:not_found, "")
    end
  end

  swagger_path :update do
    put "/api/user/{user_id}/orders/{id}"
    description "Update the status of an order"
    parameters do
      user_id :path, :integer, "User ID", required: true, example: 22
      id :path, :integer, "Order ID", required: true
      body :body, :object, "Status", required: true, schema: Schema.ref(:OrderStatusUpdate)
    end
    response 200, "OK", Schema.ref(:Order)
    response 404, "Not Found"
    response 422, "Unprocessable Entity"
  end

  def update(conn, %{"user_id" => user_id, "id" => id, "status" => status}) do
    case Repo.one!(load_user_order(user_id, id)) do
      %User{orders: [order | _]} ->
        changeset = Order.changeset(order, %{status: status})
        case Repo.update(changeset) do
          {:ok, order} ->
            conn
            |> put_resp_header("location", user_order_path(conn, :show, user_id, order))
            |> render("show.json", order: order)
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
        end
      _ ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(:not_found, "")
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
        end
      end,
      OrderStatusUpdate: swagger_schema do
        title "Order Status Update"
        property "status", :string, "Status", required: true, enum: Status.list
      end
    }
  end
end
