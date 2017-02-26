defmodule Adpq.CatalogItem do
  use Adpq.Web, :model

  @moduledoc """
    An Inventory SKU
  """

  schema "catalog_items" do
    field :clin, :string
    field :unspc, :string
    field :manufacturer, :string
    field :name, :string
    field :sku, :string
    field :description, :string
    field :unit_of_measure, :string
    field :quantity_in_uom, :integer
    field :list_price, :integer
    field :contract_unit_price, :integer
    field :contract_discount, :integer
    field :long_category, :string
    field :simple_category, :string
    field :top_level_category, :string
    has_many :order_items, Adpq.OrderItem

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, params())
    |> validate_required(required_params())
  end

  def params do
    [
      :clin,
      :unspc,
      :manufacturer,
      :sku,
      :description,
      :unit_of_measure,
      :quantity_in_uom,
      :list_price,
      :contract_unit_price,
      :contract_discount,
      :name,
      :long_category,
      :simple_category,
      :top_level_category
    ]
  end

  defp required_params do
    [
      :clin,
      :manufacturer,
      :sku,
      :description,
      :unit_of_measure,
      :quantity_in_uom,
      :list_price,
      :contract_unit_price,
      :contract_discount,
      :name,
      :long_category,
      :simple_category,
      :top_level_category
    ]
  end
end
