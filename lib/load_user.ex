defmodule Adpq.LoadUser do
  import Plug.Conn
  import Ecto.Query
  alias Adpq.{User, Repo}

  def init(opts), do: opts

  def call(conn, _) do
    case get_req_header(conn, "authorization") do
        [auth | _] ->
          user =
            User
            |> where([u], u.name == ^auth)
            |> Repo.one
          assign(conn, :user, user)
        _ -> conn
    end
  end
end
