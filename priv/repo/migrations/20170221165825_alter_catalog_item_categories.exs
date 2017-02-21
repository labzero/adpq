defmodule Adpq.Repo.Migrations.AlterCatalogItemCategories do
  use Ecto.Migration

  def change do
    alter table(:catalog_items) do
      remove :category
      add :name, :string
      add :long_category, :text
      add :top_level_category, :string
      add :simple_category, :string
    end
  end
end
