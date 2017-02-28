defmodule Adpq.AuthHelpers do
  alias Plug.Conn

  @moduledoc """
    Helper functions for authn/authz
  """

  def unauthorized(conn) do
    conn
    |> Conn.send_resp(:unauthorized, "")
    |> Conn.halt()
  end
end
