defmodule Adpq.EnsureUser do
  import Plug.Conn
  alias Adpq.AuthHelpers
  alias Adpq.User

  @moduledoc """
    A plug that checks if the authenticated user is an user
  """

  def init(opts), do: opts

  def call(conn, _) do
    case Map.get(conn.assigns, :user) do
      %User{} -> conn
      _ -> AuthHelpers.unauthorized(conn)
    end
  end
end
