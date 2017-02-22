defmodule Adpq.CartItemController do
  use Adpq.Web, :controller

  alias Adpq.{User, CartItem}

  def index(conn, %{"user_id" => user_id}) do
    user = loadUser(user_id)
    user_with_cart_items = Repo.preload(user, [{:cart_items, [:catalog_item]}])
    render(conn, "index.json", cart_items: user_with_cart_items.cart_items)
  end

  def create(conn, %{"user_id" => user_id} = params) do
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


end
