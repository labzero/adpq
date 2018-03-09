defmodule AdpqWeb.SwaggerDocsController do
  use Adpq.Web, :controller

  def index(conn, _) do
    swagger =
      :adpq
      |> Application.app_dir("priv/swagger/swagger.json")
      |> File.read!
      |> Poison.decode!
    conn
    |> put_status(:ok)
    |> json(swagger)
  end
end
