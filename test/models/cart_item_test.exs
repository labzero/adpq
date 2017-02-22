defmodule Adpq.CartItemTest do
  use Adpq.ModelCase

  alias Adpq.CartItem

  @valid_attrs %{catalog_item_id: 42, quantity: 42, user_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CartItem.changeset(%CartItem{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CartItem.changeset(%CartItem{}, @invalid_attrs)
    refute changeset.valid?
  end
end
