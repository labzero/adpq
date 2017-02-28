defmodule Adpq.AuthControllerTest do
  use Adpq.ConnCase

  alias Adpq.{User}

  @user1 %{"name" => "user1", "password" => "user"}
  @user2 %{"name" => "user2", "password" => "user"}
  @invalid_user %{"name" => "user3", "password" => "wrong"}
  @admin %{"name" => "admin", "password" => "admin"}
  @invalid_admin %{"name" => "admin", "password" => "wrong"}

  setup %{conn: conn} do
    { :ok, conn: put_req_header(conn, "accept", "application/json") }
    %{
      user: User.find_or_create_by_name(Map.put(@user1, "role", "USER")),
      admin: User.find_or_create_by_name(Map.put(@admin, "role", "ADMIN"))
    }
  end

  test "returns success for existing user", %{user: user} do
    conn = build_conn()
    conn = post conn, auth_path(conn, :create, @user1)
    assert json_response(conn, 200)["id"] == user.id
  end

  test "returns success for new user" do
    conn = build_conn()
    conn = post conn, auth_path(conn, :create, @user2)
    assert json_response(conn, 200)["name"] == @user2["name"]
  end

  test "returns unauthorized for incorrect user password" do
    conn = build_conn()
    conn = post conn, auth_path(conn, :create, @invalid_user)
    assert conn.status == 401
  end

  test "returns success for existing admin", %{admin: admin} do
    conn = build_conn()
    conn = post conn, auth_path(conn, :create, @admin)
    assert json_response(conn, 200)["id"] == admin.id
  end

  test "returns success for incorrect admin password" do
    conn = build_conn()
    conn = post conn, auth_path(conn, :create, @invalid_admin)
    assert conn.status == 401
  end
end
