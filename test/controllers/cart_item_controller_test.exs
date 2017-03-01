defmodule Adpq.CartItemControllerTest do
  use Adpq.ConnCase
  import Adpq.Factory

  alias Adpq.CartItem

  setup %{conn: conn} do
    user = insert(:user)
    catalog_item = insert(:catalog_item)
    conn =
      conn
      |> put_req_header("accept", "application/json")
      |> put_req_header("authorization", user.name)
    %{
      conn: conn,
      user: user,
      items: insert_list(3, :cart_item, %{user: user, catalog_item: catalog_item}),
      catalog_item: catalog_item
    }
  end

  test "lists all entries on index", %{conn: conn, user: user} do
    conn = get conn, user_cart_item_path(conn, :index, user.id)
    assert json_response(conn, 200) |> Enum.count == 3
  end

  test "returns 404 when the user is not found", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, user_cart_item_path(conn, :index, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn, user: user, catalog_item: catalog_item} do
    attrs = params_for(:cart_item, %{user_id: user.id, catalog_item_id: catalog_item.id})
    conn = post conn, user_cart_item_path(conn, :index, user.id), attrs
    assert json_response(conn, 201)["id"]
    assert Repo.get(CartItem, json_response(conn, 201)["id"])
  end

  test "it updates quantity", %{conn: conn, user: user, items: [item | _]} do
    conn = patch conn, user_cart_item_path(conn, :update, user.id, item.id), %{quantity: 2}
    response = json_response(conn, 200)
    assert response["id"]
    updated = Repo.get(CartItem,response["id"])
    assert updated.quantity == 2
  end

  test "it returns 404 when the item to be updated does not exist", %{conn: conn, user: user} do
    assert_error_sent 404, fn ->
      patch conn, user_cart_item_path(conn, :update, user.id, -1), %{quantity: 2}
    end
  end

  test "it returns 422 when the update is invalid", %{conn: conn, user: user, items: [item | _]} do
    conn = patch conn, user_cart_item_path(conn, :update, user.id, item.id), %{quantity: "MORE"}
    assert conn.status == 422
  end

  test "it deletes the resource", %{conn: conn, user: user, items: [item | _]} do
    conn = delete conn, user_cart_item_path(conn, :update, user.id, item.id)
    assert conn.status == 204
    refute Repo.get(CartItem, item.id)
  end



end
