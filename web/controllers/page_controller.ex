defmodule Adpq.PageController do
  use Adpq.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
