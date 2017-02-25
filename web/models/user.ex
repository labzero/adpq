defmodule Adpq.User do
  use Adpq.Web, :model

  alias Adpq.{Repo, User}

  @moduledoc """
    A system login, either a regular user/requester or admin
  """

  schema "users" do
    field :name, :string
    field :password, :string
    field :role, :string
    has_many :cart_items, Adpq.CartItem
    has_many :orders, Adpq.Order
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :password, :role])
    |> validate_required([:name, :password, :role])
  end

  def find_or_create_by_name(%{"name" => name, "password" => password, "role" => role} = params) do
    exists =
      User
      |> where(name: ^name)
      |> Repo.one
    case exists do
      %User{} -> exists
      _ -> Repo.insert!(changeset(%User{}, params))
    end
  end
end
