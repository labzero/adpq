defmodule Adpq.LoadUserTest do
  use AdpqWeb.ConnCase
  alias Adpq.{Repo, User, LoadUser}

  setup %{conn: conn} do
    user = Repo.insert!(%User{name: "Jerry", password: "user", role: "USER"})
    %{
      conn: conn,
      user: user
    }
  end

  test "loadUser looks up the user from the auth header", %{conn: conn, user: user} do
    conn = put_req_header(conn, "authorization", user.name)
    conn = LoadUser.call(conn, %{})
    assert conn.assigns[:user].id == user.id
  end
end
