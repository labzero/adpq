defmodule Adpq.Admin.OrderControllerTest do
  use Adpq.ConnCase
  import Adpq.Factory

  setup %{conn: conn} do
    admin = insert(:user, %{role: "ADMIN"})
    conn =
      conn
      |> put_req_header("accept", "application/json")
      |> put_req_header("authorization", admin.name)
    %{ conn: conn }
  end

  test "index returns unauthorized unless the user has the admin role" do
    conn = user_conn(insert(:user))
    conn = get conn, admin_order_path(conn, :index)
    assert conn.status == 401
  end

  test "index returns all orders", %{conn: conn} do
    6
    |> insert_list(:user)
    |> Enum.each(fn u -> order_with_items(u, 2) end)
    conn = get conn, admin_order_path(conn, :index)
    assert json_response(conn, 200) |> Enum.count == 6

  end

  test "show returns any order", %{conn: conn} do
    order = order_with_items(insert(:user), 1)
    conn = get conn, admin_order_path(conn, :show, order.id)
    assert json_response(conn, 200)["department"] == order.user.department
  end

  test "show returns unauthorized unless the user has the admin role" do
    order = insert(:order)
    conn = user_conn(insert(:user))
    conn = get conn, admin_order_path(conn, :show, order.id)
    assert conn.status == 401
  end

  test "show returns not found if the order does not exist", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, admin_order_path(conn, :show, -1)
    end
  end

  test "update returns unauthorized unless the user has the admin role" do
    order = insert(:order)
    conn = user_conn(insert(:user))
    conn = get conn, admin_order_path(conn, :update, order.id)
    assert conn.status == 401
  end

  test "update allows the admin to update the status of any order", %{conn: conn} do
    order = insert(:order)
    conn = patch conn, admin_order_path(conn, :update, order.id), %{"status" => "CANCELLED"}
    assert json_response(conn, 200)["status"] == "CANCELLED"
  end

  test "update returns not found if the order does not exist", %{conn: conn} do
    assert_error_sent 404, fn ->
      patch conn, admin_order_path(conn, :update, -1), %{"status" => "SUBMITTED"}
    end
  end

  test "update does not allow the admin to update any other fields", %{conn: conn} do
    assert_error_sent 400, fn ->
      patch conn, admin_order_path(conn, :update, insert(:order).id), %{"user_id" => insert(:user).id}
    end
  end

  def user_conn(user) do
    build_conn()
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", user.name)
  end
end
