defmodule Adpq.Order do
  use Adpq.Web, :model

  schema "orders" do
    belongs_to :user, Adpq.User
    field :status, :string
    has_many :order_items, Adpq.OrderItem

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :status])
    |> validate_required([:user_id, :status])
  end

  defmodule Status do
    def submitted, do: "SUBMITTED"
    def cancelled, do: "CANCELLED"
  end
end
