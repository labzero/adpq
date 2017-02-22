defmodule Adpq.CatalogItemControllerTest do
  use Adpq.ConnCase
  import Adpq.Factory

  alias Adpq.CatalogItem
  @valid_attrs %{
      long_category: "long",
      clin: "abcd",
      name: "A Computer",
      contract_discount: 42,
      contract_unit_price: 42,
      description: "lorem ipsum",
      list_price: 42,
      manufacturer: "HP",
      quantity_in_uom: 42,
      sku: "A-123",
      simple_category: "simple",
      top_level_category: "top level",
      unit_of_measure: "some content",
      unspc: "some content"
    }
  @invalid_attrs %{}

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
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    catalog_item = Repo.insert! %CatalogItem{}
    conn = get conn, catalog_item_path(conn, :show, catalog_item)
    assert json_response(conn, 200)["data"] == %{"id" => catalog_item.id,
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

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, catalog_item_path(conn, :create), catalog_item: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(CatalogItem, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, catalog_item_path(conn, :create), catalog_item: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    catalog_item = Repo.insert!(CatalogItem.changeset(%CatalogItem{}, @valid_attrs))
    conn = put conn, catalog_item_path(conn, :update, catalog_item), catalog_item: Map.put(@valid_attrs, "name", "new name")
    assert json_response(conn, 200)["data"]["name"] == "new name"
    assert Repo.get(CatalogItem, json_response(conn, 200)["data"]["id"])
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    catalog_item = Repo.insert!(CatalogItem.changeset(%CatalogItem{}, @valid_attrs))
    conn = put conn, catalog_item_path(conn, :update, catalog_item), catalog_item: Map.put(@valid_attrs, "name", nil)
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    catalog_item = Repo.insert!(CatalogItem.changeset(%CatalogItem{}, @valid_attrs))
    conn = delete conn, catalog_item_path(conn, :delete, catalog_item)
    assert response(conn, 204)
    refute Repo.get(CatalogItem, catalog_item.id)
  end
end
