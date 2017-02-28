defmodule Adpq.CatalogItemControllerTest do
  use Adpq.ConnCase
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
    assert json_response(conn, 200)== %{"id" => catalog_item.id,
      "clin" => catalog_item.clin,
      "unspc" => catalog_item.unspc,
      "manufacturer" => catalog_item.manufacturer,
      "sku" => catalog_item.sku,
      "description" => catalog_item.description,
      "unit_of_measure" => catalog_item.unit_of_measure,
      "quantity_in_uom" => catalog_item.quantity_in_uom,
      "list_price" => catalog_item.list_price,
      "contract_unit_price" => catalog_item.contract_unit_price,
      "contract_discount" => catalog_item.contract_discount,
      "simple_category" => catalog_item.simple_category,
      "name" => catalog_item.name,
      "top_level_category" => catalog_item.top_level_category}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, catalog_item_path(conn, :show, -1)
    end
  end

end
