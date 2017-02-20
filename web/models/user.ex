defmodule Adpq.User do
  use Adpq.Web, :model

  alias Adpq.Repo

  schema "users" do
    field :name, :string
    field :password, :string
    field :role, :string

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
      Adpq.User
      |> where(name: ^name)
      |> Repo.one
    case exists do
      %Adpq.User{} -> exists
      _ -> Repo.insert!(Adpq.User.changeset(%Adpq.User{}, params))
    end
  end
end
