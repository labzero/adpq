defmodule Adpq.Repo.Migrations.CreateCartItem do
  use Ecto.Migration

  def change do
    create table(:cart_items) do
      add :user_id, references(:users)
      add :catalog_item_id, references(:catalog_items)
      add :quantity, :integer

      timestamps()
    end

  end
end
