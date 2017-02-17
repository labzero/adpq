defmodule Adpq.CatalogItemControllerTest do
  use Adpq.ConnCase

  alias Adpq.CatalogItem
  @valid_attrs %{category: "some content", clin: "some content", contract_discount: 42, contract_unit_price: 42, description: "some content", list_price: 42, manufacturer: "some content", quantity_in_uom: 42, sku: "some content", super_category: "some content", unit_of_measure: "some content", unspc: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
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
      "category" => catalog_item.category,
      "super_category" => catalog_item.super_category}
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
    catalog_item = Repo.insert! %CatalogItem{}
    conn = put conn, catalog_item_path(conn, :update, catalog_item), catalog_item: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(CatalogItem, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    catalog_item = Repo.insert! %CatalogItem{}
    conn = put conn, catalog_item_path(conn, :update, catalog_item), catalog_item: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    catalog_item = Repo.insert! %CatalogItem{}
    conn = delete conn, catalog_item_path(conn, :delete, catalog_item)
    assert response(conn, 204)
    refute Repo.get(CatalogItem, catalog_item.id)
  end
end
