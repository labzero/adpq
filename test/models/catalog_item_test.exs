defmodule Adpq.CatalogItemTest do
  use Adpq.ModelCase

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

  test "changeset with valid attributes" do
    changeset = CatalogItem.changeset(%CatalogItem{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CatalogItem.changeset(%CatalogItem{}, @invalid_attrs)
    refute changeset.valid?
  end
end
