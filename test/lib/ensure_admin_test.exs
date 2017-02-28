defmodule Adpq.EnsureAdminTest do
  use Adpq.ConnCase
  alias Adpq.EnsureAdmin

  setup %{conn: conn} do
    %{ conn: conn }
  end

  test "ensureAdmin return unauthorize if the user in the assigns is not an admin", %{conn: conn} do
    conn = EnsureAdmin.call(conn, %{})
    assert conn.status == 401
  end
end
