defmodule Adpq.User do
  use Adpq.Web, :model

  alias Adpq.{Repo, User, User.Department}

  @moduledoc """
    A system login, either a regular user/requester or admin
  """

  schema "users" do
    field :name, :string
    field :password, :string
    field :role, :string
    field :department, :string
    has_many :cart_items, Adpq.CartItem
    has_many :orders, Adpq.Order
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :password, :role, :department])
    |> validate_required([:name, :password, :role, :department])
  end

  def find_or_create_by_name(%{"name" => name, "password" => _, "role" => _} = params) do
    exists =
      User
      |> where(name: ^name)
      |> Repo.one
    case exists do
      %User{} -> exists
      _ -> Repo.insert!(changeset(%User{}, Map.put(params, "department", Department.random)))
    end
  end

  defmodule Department do
    @moduledoc """
      Departments to arbitrarily assign demo users
    """
    @departments ~w(DCSS CDE ABC PARKS)
    def random, do: Enum.random(@departments)
    def all, do: @departments
  end

end
