defmodule Adpq.Repo.Migrations.AddUsersDepartment do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :department, :string
    end
  end
end
