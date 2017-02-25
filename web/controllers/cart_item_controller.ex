defmodule Adpq.CartItemController do
  use Adpq.Web, :controller
  use PhoenixSwagger

  alias Adpq.{User, CartItem}

  swagger_path :index do
    get "/api/user/{user_id}/cart_items"
    description "List items in a users cart"
    produces "application/json"
    parameter "user_id", :path, :integer, "User ID", required: true, example: 22
    response 200, "OK", Schema.ref(:CartItems)
    response 404, "Not Found"
  end

  def index(conn, %{"user_id" => user_id}) do
    user = loadUser(user_id)
    user_with_cart_items = Repo.preload(user, [{:cart_items, [:catalog_item]}])
    render(conn, "index.json", cart_items: user_with_cart_items.cart_items)
  end

  swagger_path :create do
    post "/api/user/{user_id}/cart_items"
    description "Add an item to a users cart"
    produces "application/json"
    parameters do
      user_id :path, :integer, "User ID", required: true, example: 22
      body :body, :object, "catalog item id and quantity", required: true, schema: Schema.ref(:CartItemBody)
    end
    response 200, "OK", Schema.ref(:CartItem)
    response 404, "Not Found"
  end

  def create(conn, %{"user_id" => _} = params) do
    changeset = CartItem.changeset(%CartItem{}, params)
    case Repo.insert(changeset) do
      {:ok, cart_item} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", user_cart_item_path(conn, :index, cart_item))
        |> render("show.json", cart_item: Repo.preload(cart_item, [:user, :catalog_item]))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  swagger_path :update do
    put "/api/user/{user_id}/cart_items/{id}"
    description "Update quantity of an item in a users cart"
    produces "application/json"
    parameters do
      user_id :path, :integer, "User ID", required: true, example: 22
      id :path, :integer, "Item ID", required: true, example: 33
      body :body, :object, "Quantity", required: true, schema: Schema.ref(:CartItemUpdate)
    end
    response 200, "OK", Schema.ref(:CartItem)
    response 404, "Not Found"
  end

  def update(conn, %{"user_id" => user_id, "id" => id, "quantity" => quantity}) do
    user = loadUser(user_id)
    item = Repo.get_by!(CartItem, %{id: id, user_id: user.id})
    changeset = CartItem.update_changeset(item, %{quantity: quantity})
    case Repo.update(changeset) do
      {:ok, cart_item} ->
        conn
        |> put_status(:ok)
        |> render("show.json", cart_item: Repo.preload(cart_item, [:user, :catalog_item]))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  swagger_path :delete do
    delete "/api/user/{user_id}/cart_items/{id}"
    description "Remove item from users cart"
    produces "application/json"
    parameters do
      user_id :path, :integer, "User ID", required: true, example: 22
      id :path, :integer, "Item ID", required: true, example: 33
    end
    response 201, "OK"
    response 404, "Not Found"
  end

  def delete(conn, %{"user_id" => user_id, "id" => id}) do
    user = loadUser(user_id)
    item = Repo.get_by!(CartItem, %{id: id, user_id: user.id})
    case Repo.delete(item) do
      {:ok, _} ->
        conn
        |> put_resp_header("content-type", "application/json")
        |> send_resp(:no_content, "")
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end

  end

  def loadUser(user_id) do
    # TODO ensure === session user
    Repo.get!(User, user_id)
  end

  def swagger_definitions do
    %{
      CartItem: swagger_schema do
        title "Cart Item"
        description "Cart Item"
        properties do
          catalog_item_id :integer, "Catalog Item ID", required: true
          quantity :integer, "Quantity", required: true
          user_id :integer, "User ID", required: true
          name :string, "Name", required: true
          price :integer, "Price", required: true
        end
      end,
      CartItemBody: swagger_schema do
        title "Cart Item Body"
        description "required JSON to create cart item"
        properties do
          catalog_item_id :integer, "Catalog Item ID", required: true
          quantity :integer, "Quantity", required: true
        end
      end,
      CartItemUpdate: swagger_schema do
        title "Cart Item Quantity Update"
        description "New Quantity"
        property "quantity", :integer, "Quantity", required: true
      end
    }
  end

end
