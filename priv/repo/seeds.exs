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
  alias Ecto.Repo
  alias Adpq.CatalogItem

  def insertRows do
    'priv/repo/catalog.csv'
    |> File.stream!()
    |> CSV.decode(headers: true)
    |> Enum.map(&processRow/1)
    |> Enum.each(&insertRow/1)
  end

  defp dollarsToInt(dollars) do
    dollars
    |> String.replace("$", "")
    |> String.replace(".", "")
    |> String.replace(",", "")
  end

  defp cleanNewlines(text) do
    String.replace(text, ~s(\n\r\n), ~s(\n))
  end

  defp fieldMappings do
    %{
      "contract_unit_price" => &dollarsToInt/1,
      "list_price" => &dollarsToInt/1,
      "description" => &cleanNewlines/1,
      "category" => &cleanNewlines/1
    }
  end

  defp processRow(row) do
    row
    |> Enum.map(fn {k, v} -> if Map.has_key?(fieldMappings(), k) do {k, Map.get(fieldMappings(), k).(v)} else {k, v} end end)
    |> Enum.into(%{})
  end

  defp insertRow(row) do
    CatalogItem.changeset(%CatalogItem{}, row)
    |> Adpq.Repo.insert
  end
end

Adpq.CatalogSeeds.insertRows()
