defmodule Adpq.CatalogItemControllerTest do
  use AdpqWeb.ConnCase
  import Adpq.Factory

  alias Adpq.CatalogItem

  setup %{conn: conn} do
    user = insert(:user)
    conn =
      conn
      |> put_req_header("accept", "application/json")
      |> put_req_header("authorization", user.name)
    %{conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, catalog_item_path(conn, :index)
    assert json_response(conn, 200) == []
  end

  test "shows chosen resource", %{conn: conn} do
    catalog_item = Repo.insert! %CatalogItem{}
    conn = get conn, catalog_item_path(conn, :show, catalog_item)
    assert json_response(conn, 200)["sku"] == catalog_item.sku
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, catalog_item_path(conn, :show, -1)
    end
  end

end
