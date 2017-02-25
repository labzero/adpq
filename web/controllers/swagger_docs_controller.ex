defmodule Adpq.SwaggerDocsController do
  use Adpq.Web, :controller

  def index(conn, _) do
    swagger =
      Application.app_dir(:adpq, "priv/swagger/swagger.json")
      |> File.read!
      |> Poison.decode!
    conn
    |> put_status(:ok)
    |> json(swagger)
  end
end
