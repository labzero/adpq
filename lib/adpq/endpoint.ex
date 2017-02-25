defmodule Adpq.Endpoint do
  use Phoenix.Endpoint, otp_app: :adpq

  socket "/socket", Adpq.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/", from: :adpq, gzip: false,
    only: ~w(css fonts img images js favicon.ico robots.txt swagger.json),
    headers: %{"Access-Control-Allow-Origin" => "*"}

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_adpq_key",
    signing_salt: "R3qLN8KP"

  plug Corsica, origins: "*", allow_headers: ["authorization", "content-type"]
  plug Adpq.Router
end
