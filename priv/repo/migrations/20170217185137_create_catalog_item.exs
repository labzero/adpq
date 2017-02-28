defmodule Adpq.Repo.Migrations.CreateCatalogItem do
  use Ecto.Migration

  def change do
    create table(:catalog_items) do
      add :clin, :string
      add :unspc, :string
      add :manufacturer, :string
      add :sku, :string
      add :description, :text
      add :unit_of_measure, :string
      add :quantity_in_uom, :integer
      add :list_price, :integer
      add :contract_unit_price, :integer
      add :contract_discount, :integer
      add :category, :string
      add :super_category, :string

      timestamps()
    end

  end
end
