defmodule Adpq.CatalogItemController do
  use Adpq.Web, :controller

  alias Adpq.CatalogItem

  def index(conn, _params) do
    catalog_items = Repo.all(CatalogItem)
    render(conn, "index.json", catalog_items: catalog_items)
  end

  def create(conn, %{"catalog_item" => catalog_item_params}) do
    changeset = CatalogItem.changeset(%CatalogItem{}, catalog_item_params)

    case Repo.insert(changeset) do
      {:ok, catalog_item} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", catalog_item_path(conn, :show, catalog_item))
        |> render("show.json", catalog_item: catalog_item)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    catalog_item = Repo.get!(CatalogItem, id)
    render(conn, "show.json", catalog_item: catalog_item)
  end

  def update(conn, %{"id" => id, "catalog_item" => catalog_item_params}) do
    catalog_item = Repo.get!(CatalogItem, id)
    changeset = CatalogItem.changeset(catalog_item, catalog_item_params)

    case Repo.update(changeset) do
      {:ok, catalog_item} ->
        render(conn, "show.json", catalog_item: catalog_item)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Adpq.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    catalog_item = Repo.get!(CatalogItem, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(catalog_item)

    send_resp(conn, :no_content, "")
  end
end
