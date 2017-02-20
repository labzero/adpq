defmodule Adpq.AuthController do
  use Adpq.Web, :controller

  alias Adpq.{User, Repo}

  def create(conn, %{"name" => username, "password" => "user"} = params) do
    user = User.find_or_create_by_name(Map.put(params, "role", "USER"))
    render(conn, "show.json", auth: user)
  end

  def create(conn, %{"name" => "admin", "password" => "admin"}) do
    user = Repo.get_by!(User, name: "admin")
    render(conn, "show.json", auth: user)
  end

  def create(conn, _) do
    send_resp(conn, :unauthorized, "")
  end

end
