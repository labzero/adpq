defmodule Adpq.EnsureAdmin do
  import Plug.Conn
  import Ecto.Query
  
  alias Adpq.AuthHelpers
  alias Adpq.User

  def init(opts), do: opts

  def call(conn, _) do
    case Map.get(conn.assigns, :user) do
      %User{role: "ADMIN"} -> conn
      _ -> AuthHelpers.unauthorized(conn)
    end
  end
end
