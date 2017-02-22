defmodule Adpq.CartItem do
  use Adpq.Web, :model

  schema "cart_items" do
    field :quantity, :integer
    belongs_to :user, Adpq.User
    belongs_to :catalog_item, Adpq.CatalogItem
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :catalog_item_id, :quantity])
    |> validate_required([:user_id, :catalog_item_id, :quantity])
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:quantity])
    |> validate_required([:quantity]) 
  end
end
