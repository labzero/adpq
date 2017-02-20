defmodule Adpq.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, unique: true
      add :password, :string
      add :role, :string

      timestamps()
    end

  end
end
