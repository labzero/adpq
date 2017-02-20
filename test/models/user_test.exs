defmodule Adpq.UserTest do
  use Adpq.ModelCase

  alias Adpq.{User, Repo}

  @valid_attrs %{name: "name", password: "pw", role: "USER"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "find or create a new user (user already exists)" do
    user = Repo.insert!(User.changeset(%User{}, @valid_attrs))
    params =
      for {key, val} <- @valid_attrs, into: %{}, do: {Atom.to_string(key), val}
    found_or_created = User.find_or_create_by_name(params)
    assert user.id === found_or_created.id
  end

  test "find or create new user" do
    attributes = %{name: "test", password: "test", role: "USER"}
    user = Repo.insert!(User.changeset(%User{}, attributes))
    assert user.id !== nil
  end
end
