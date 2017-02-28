# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Adpq.Repo.insert!(%Adpq.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Adpq.CatalogSeeds do
  alias Adpq.{Repo, CatalogItem, User, CartItem, OrderItem, Order}
  alias Adpq.CatalogItem
  alias Adpq.User
  import Ecto.Query

  def insertRows do
    'priv/repo/catalog.csv'
    |> File.stream!()
    |> CSV.decode(headers: true)
    |> Enum.map(&processRow/1)
    |> Enum.each(&insertRow/1)
  end

  def clean do
    Adpq.Repo.delete_all(OrderItem)
    Adpq.Repo.delete_all(Order)
    Adpq.Repo.delete_all(CartItem)
    Adpq.Repo.delete_all(CatalogItem)
  end

  defp dollarsToInt(dollars) do
    dollars
    |> String.replace("$", "")
    |> String.replace(".", "")
    |> String.replace(",", "")
  end

  defp dollarsToInt(dollars) do
    dollars
    |> String.replace("$", "")
    |> String.replace(".", "")
    |> String.replace(",", "")
  end

  defp percentToInt(pct) do
    String.replace(pct, "%", "")
  end

  defp cleanNewlines(text) do
    String.replace(text, ~s(\n\r\n), ~s(\n))
  end

  defp cleanSku(sku) do
    [clean] =
      sku
      |> String.split(",")
      |> Enum.take(1)
    clean
  end

  defp fieldMappings do
    %{
      "contract_unit_price" => &dollarsToInt/1,
      "contract_discount" => &percentToInt/1,
      "list_price" => &dollarsToInt/1,
      "description" => &cleanNewlines/1,
      "long_category" => &cleanNewlines/1,
      "sku" => &cleanSku/1
    }
  end

  defp processRow(row) do
    row
    |> Enum.map(fn {k, v} -> if Map.has_key?(fieldMappings(), k) do {k, Map.get(fieldMappings(), k).(v)} else {k, v} end end)
    |> Enum.into(%{})
  end

  defp insertRow(row) do
    sku = row["sku"]
    exists =
      CatalogItem
      |> where(sku: ^sku)
      |> Repo.one
    case exists do
      %CatalogItem{} -> IO.puts("SKU #{sku} already exists. Skipping..")
      _ -> row = Adpq.Repo.insert(CatalogItem.changeset(%CatalogItem{}, row))
          inspect row
    end
  end
end

defmodule Adpq.UserSeeds do
  alias Adpq.Repo
  alias Adpq.User

  def create_admin do
    User.find_or_create_by_name(%{"name" => "admin", "password" => "admin", "role" => "ADMIN"})
  end

  def create_user do
    User.find_or_create_by_name(%{"name" => "user", "password" => "user", "role" => "USER"})
  end
end

Adpq.CatalogSeeds.clean()
Adpq.CatalogSeeds.insertRows()
Adpq.UserSeeds.create_admin()
Adpq.UserSeeds.create_user()
