defmodule Adpq.CatalogItemTest do
  use Adpq.ModelCase

  alias Adpq.CatalogItem

  @valid_attrs %{category: "some content", clin: "some content", contract_discount: 42, contract_unit_price: 42, description: "some content", list_price: 42, manufacturer: "some content", quantity_in_uom: 42, sku: "some content", super_category: "some content", unit_of_measure: "some content", unspc: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CatalogItem.changeset(%CatalogItem{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CatalogItem.changeset(%CatalogItem{}, @invalid_attrs)
    refute changeset.valid?
  end
end
