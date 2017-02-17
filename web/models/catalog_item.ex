defmodule Adpq.CatalogItem do
  use Adpq.Web, :model

  schema "catalog_items" do
    field :clin, :string
    field :unspc, :string
    field :manufacturer, :string
    field :sku, :string
    field :description, :string
    field :unit_of_measure, :string
    field :quantity_in_uom, :integer
    field :list_price, :integer
    field :contract_unit_price, :integer
    field :contract_discount, :integer
    field :category, :string
    field :super_category, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:clin, :unspc, :manufacturer, :sku, :description, :unit_of_measure, :quantity_in_uom, :list_price, :contract_unit_price, :contract_discount, :category, :super_category])
    |> validate_required([:clin, :manufacturer, :sku, :description, :unit_of_measure, :quantity_in_uom, :list_price, :contract_unit_price, :contract_discount, :category])
  end
end
