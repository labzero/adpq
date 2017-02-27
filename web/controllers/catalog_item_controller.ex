defmodule Adpq.CatalogItemController do
  use Adpq.Web, :controller
  use PhoenixSwagger

  alias Adpq.CatalogItem

  swagger_path :index do
    get "/api/catalog_items"
    description "List all catalog items"
    produces "application/json"
    response 200, "OK", Schema.ref(:CatalogItems)
  end

  def index(conn, _params) do
    catalog_items = Repo.all(CatalogItem)
    render(conn, "index.json", catalog_items: catalog_items)
  end

  swagger_path :show do
    get "/api/catalog_items/{id}"
    description "Show a single catalog item"
    produces "application/json"
    parameter "id", :path, :string, "Item ID", required: true, example: "22"
    response 200, "OK", Schema.ref(:CatalogItem)
    response 404, "Not Found"
  end

  def show(conn, %{"id" => id}) do
    catalog_item = Repo.get!(CatalogItem, id)
    render(conn, "show.json", catalog_item: catalog_item)
  end

  def swagger_definitions do
    %{
      CatalogItem: swagger_schema do
        title "CatalogItem"
        description "An inventory SKU"
        properties do
          id :string, "Item ID"
          unspc :string, "United Nations Standard Products and Services Code"
          unit_of_measure :string, "e.g. EACH, DOZEN etc", required: true
          quantity_in_uom :integer, "Quantity per item", required: true
          category :string, "Item category", required: true
          super_category :string, "Rollup category"
          sku :string, "SKU / OEM part number", required: true
          manufacturer :string, "Manufacturer name", required: true
          list_price :integer, "List price in cents", required: true
          description :string, "Item description", required: true
          contract_unit_price :integer, "Contract unit price in cents"
          contract_discount :integer, "Contract discount (%)"
          clin :string, "Contract line item number"
        end
      end,
      CatalogItems: swagger_schema do
        title "CatalogItems"
        description "A collection of CatalogItems"
        type :array
        items Schema.ref(:CatalogItem)
      end
    }
  end
end
