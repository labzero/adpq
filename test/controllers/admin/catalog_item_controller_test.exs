defmodule Adpq.Admin.CatalogItemControllerTest do
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

  test "index returns all catalog items", %{conn: conn} do
    insert_list(6, :catalog_item)
    conn = get conn, admin_catalog_item_path(conn, :index)
    assert json_response(conn, 200) |> Enum.count == 6
  end

  test "index returns unauthorized unless the user has the admin role" do
    conn = user_conn(insert(:user))
    conn = get conn, admin_catalog_item_path(conn, :index)
    assert conn.status == 401
  end

  test "show returns unauthorized unless the user has the admin role" do
    item = insert(:catalog_item)
    conn = user_conn(insert(:user))
    conn = get conn, admin_catalog_item_path(conn, :show, item)
    assert conn.status == 401
  end

  test "create returns unauthorized unless the user has the admin role" do
    conn = user_conn(insert(:user))
    conn = post conn, admin_catalog_item_path(conn, :create), %{}
    assert conn.status == 401
  end

  test "create creates a new catalog item if all required fields are provided", %{conn: conn} do
    attrs = params_for(:catalog_item)
    conn = post conn, admin_catalog_item_path(conn, :create), attrs
    response = json_response(conn, 201)
    assert response["id"]
    assert response["sku"] == attrs[:sku]
  end

  test "create returns 422 if a required field is not provided", %{conn: conn} do
    [
      :clin,
      :manufacturer,
      :sku,
      :description,
      :unit_of_measure,
      :quantity_in_uom,
      :list_price,
      :contract_unit_price,
      :name,
      :simple_category,
      :top_level_category
    ]
    |> Enum.each(
      fn param ->
        attrs = Map.drop(params_for(:catalog_item), [param])
        conn = post conn, admin_catalog_item_path(conn, :create), attrs
        assert conn.status == 422
      end)
  end

  test "update returns unauthorized unless the user has the admin role" do
    item = insert(:catalog_item)
    conn = user_conn(insert(:user))
    conn = patch conn, admin_catalog_item_path(conn, :update, item.id), %{}
    assert conn.status == 401
  end

  test "update updates the selected resource", %{conn: conn} do
    item = insert(:catalog_item)
    updates = %{
      clin: "new clin",
      contract_discount: 0,
      contract_unit_price: 0,
      description: "new descriptio ",
      list_price: 0,
      manufacturer: "new manufacturer",
      name: "new name",
      quantity_in_uom: 2,
      simple_category: "new category",
      sku: "YYYY",
      top_level_category: "new category",
      unit_of_measure: "pair",
      unspc: "zzzz"
    }
    conn = patch conn, admin_catalog_item_path(conn, :update, item.id), updates
    response = json_response(conn, 200)
    Enum.each(updates, fn {k, v} -> assert response[Atom.to_string(k)] == v end)
  end

  test "update returns 422 if an invalid field value is provided", %{conn: conn} do
    item = insert(:catalog_item)
    conn = patch conn, admin_catalog_item_path(conn, :update, item.id), %{list_price: "not a number"}
    assert conn.status == 422
  end

  def user_conn(user) do
    build_conn()
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", user.name)
  end

end
