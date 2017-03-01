defmodule Adpq.EnsureUserTest do
  use Adpq.ConnCase

  alias Adpq.EnsureUser

  setup %{conn: conn} do
    %{ conn: conn }
  end

  test "ensureUser returns unauthorized if there is no user in the assigns", %{conn: conn} do
    conn = EnsureUser.call(conn, %{})
    assert conn.status == 401
  end
end
