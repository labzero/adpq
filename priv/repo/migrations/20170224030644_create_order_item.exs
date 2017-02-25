defmodule Adpq.Repo.Migrations.CreateOrderItem do
  use Ecto.Migration

  def change do
    create table(:order_items) do
      add :order_id, references(:orders)
      add :catalog_item_id, references(:catalog_items)
      add :quantity, :integer
      add :price, :integer

      timestamps()
    end

  end
end
