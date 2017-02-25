defmodule Adpq.AuthHelpers do
  alias Plug.Conn

  def unauthorized(conn) do
    conn
    |> Conn.send_resp(:unauthorized, "")
    |> Conn.halt()
  end
end
