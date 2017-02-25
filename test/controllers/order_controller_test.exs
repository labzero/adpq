defmodule Adpq.OrderControllerTest do
  use Adpq.ConnCase
  import Adpq.Factory

  alias Adpq.Order

  setup %{conn: conn} do
    user = insert(:user)
    conn =
      conn
      |> put_req_header("accept", "application/json")
      |> put_req_header("authorization", user.name)
    %{
      conn: conn,
      user: user
    }
  end

  test "lists all orders for user on index", %{conn: conn, user: user} do
    _order = order_with_items(user, 2)
    conn = get conn, user_order_path(conn, :index, user.id)
    assert json_response(conn, 200) |> Enum.count == 1
  end

  test "does not list other user's orders on index", %{conn: conn, user: user} do
    _order = order_with_items(user, 2)
    _other_order = order_with_items(build(:user), 2)
    conn = get conn, user_order_path(conn, :index, user.id)
    assert json_response(conn, 200) |> Enum.count == 1
  end

  test "includes items for the order(s) on index", %{conn: conn, user: user} do
    _order = order_with_items(user, 2)
    conn = get conn, user_order_path(conn, :index, user.id)
    [response | _] = json_response(conn, 200)
    assert response["items"] |> Enum.count == 2
  end


  test "shows chosen resource", %{conn: conn, user: user} do
    order = order_with_items(user, 2)
    conn = get conn, user_order_path(conn, :show, user.id, order)
    response = json_response(conn, 200)
    assert response["id"] == order.id
    assert response["status"] == "SUBMITTED"
    assert response["items"] |> Enum.count == 2
  end

   test "returns page not found when id is nonexistent", %{conn: conn} do
     assert_error_sent 404, fn ->
       get conn, user_order_path(conn, :show, -1, -1)
     end
   end

   test "creates and renders resource when data is valid", %{conn: conn} do
     user = insert(:user)
     _cart_items = insert_list(2, :cart_item, %{user: user})
     conn = post conn, user_order_path(conn, :create, user)
     response = json_response(conn, 201)
     assert response["items"] |> Enum.count == 2
     assert Repo.get(Order, response["id"])
   end

   test "it will not create an empty order", %{conn: conn} do
     user = insert(:user)
     conn = post conn, user_order_path(conn, :create, user)
     assert json_response(conn, 422)
   end


   test "it updates the status", %{conn: conn, user: user} do
     order = order_with_items(user, 3)
     conn = patch conn, user_order_path(conn, :update, user, order), status: Order.Status.cancelled
     assert json_response(conn, 200)["status"] == "CANCELLED"
   end


  #
  # test "updates and renders chosen resource when data is valid", %{conn: conn} do
  #   order = Repo.insert! %Order{}
  #   conn = put conn, order_path(conn, :update, order), order: @valid_attrs
  #   assert json_response(conn, 200)["data"]["id"]
  #   assert Repo.get_by(Order, @valid_attrs)
  # end
  #
  # test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
  #   order = Repo.insert! %Order{}
  #   conn = put conn, order_path(conn, :update, order), order: @invalid_attrs
  #   assert json_response(conn, 422)["errors"] != %{}
  # end

  defp order_with_items(user, num_items) do
    order = insert(:order, %{user: user})
    insert_list(num_items, :order_item, %{order: order})
    order
  end

end
