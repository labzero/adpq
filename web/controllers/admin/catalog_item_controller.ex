defmodule Adpq.Admin.CatalogItemController do
  use Adpq.Web, :controller
  use PhoenixSwagger

  alias Adpq.{CatalogItem, CatalogItemController}

  swagger_path :index do
    get "/api/admin/catalog_items"
    tag "Admin CatalogItem"
    description "List all catalog items"
    produces "application/json"
    response 200, "OK", Schema.ref(:CatalogItems)
  end

  def index(conn, _params) do
    catalog_items = Repo.all(CatalogItem)
    render(conn, Adpq.CatalogItemView, "index.json", catalog_items: catalog_items)
  end

  swagger_path :show do
    get "/api/admin/catalog_items/{id}"
    description "Show a single catalog item"
    tag "Admin CatalogItem"
    produces "application/json"
    parameter "id", :path, :string, "Item ID", required: true, example: "22"
    response 200, "OK", Schema.ref(:CatalogItem)
    response 404, "Not Found"
  end

  def show(conn, %{"id" => id}) do
    catalog_item = Repo.get!(CatalogItem, id)
    render(conn, Adpq.CatalogItemView, "show.json", catalog_item: catalog_item)
  end

  swagger_path :create do
    post "/api/admin/catalog_items"
    description "Create a new catalog item"
    produces "application/json"
    tag "Admin CatalogItem"
    parameter "body", :body, :object, "Body", required: true, schema: :CatalogItemBody
    response 201, "Created", Schema.ref(:CatalogItem)
    response 422, "Unprocesseable"
  end

  def create(conn, params) do
    changeset = CatalogItem.changeset(%CatalogItem{}, params)
    case Repo.insert(changeset) do
      {:ok, item} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", admin_catalog_item_path(conn, :show, item))
        |> render(Adpq.CatalogItemView, "show.json", catalog_item: item)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  swagger_path :update do
    put "/api/admin/catalog_items/{id}"
    description "Create a new catalog item"
    produces "application/json"
    tag "Admin CatalogItem"
    parameters do
      id :path, :integer, "ID", required: true, example: 235
      body :body, :object, "Body", required: true, schema: :CatalogItemUpdate
    end
    response 200, "OK", Schema.ref(:CatalogItem)
    response 422, "Unprocesseable"
  end

  def update(conn, %{"id" => id} = params) do
    item = Repo.get!(CatalogItem, id)
    changeset = CatalogItem.changeset(item, Map.drop(params, ["id"]))
    case Repo.update(changeset) do
      {:ok, item} ->
        conn
        |> put_status(:ok)
        |> render(Adpq.CatalogItemView, "show.json", catalog_item: item)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def swagger_definitions do
    Map.merge(
      CatalogItemController.swagger_definitions(),
      %{
        CatalogItemBody: swagger_schema do
          title "CatalogItemBody"
          description "Request body for creating a CatalogItem"
          properties do
            unspc :string, "United Nations Standard Products and Services Code"
            unit_of_measure :string, "e.g. EACH, DOZEN etc", required: true
            quantity_in_uom :integer, "Quantity per item", required: true
            category :string, "Item category", required: true
            super_category :string, "Rollup category", required: true
            updated_at :string, "Last Modified Date", required: true
            sku :string, "SKU / OEM part number", required: true
            manufacturer :string, "Manufacturer name", required: true
            list_price :integer, "List price in cents", required: true
            description :string, "Item description", required: true
            contract_unit_price :integer, "Contract unit price in cents", required: true
            contract_discount :integer, "Contract discount (%)", required: true
            clin :string, "Contract line item number", required: true
          end
        end,
        CatalogItemUpdate: swagger_schema do
          title "CatalogItemUpdate"
          description "Changes to be applied to a CatalogItem"
          properties do
            unspc :string, "United Nations Standard Products and Services Code"
            unit_of_measure :string, "e.g. EACH, DOZEN etc"
            quantity_in_uom :integer, "Quantity per item"
            category :string, "Item category"
            super_category :string, "Rollup category"
            sku :string, "SKU / OEM part number", required: true
            manufacturer :string, "Manufacturer name"
            list_price :integer, "List price in cents"
            description :string, "Item description"
            contract_unit_price :integer, "Contract unit price in cents"
            contract_discount :integer, "Contract discount (%)"
            clin :string, "Contract line item number"
          end
        end
      })
  end
end
