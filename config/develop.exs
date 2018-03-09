use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :adpq, AdpqWeb.Endpoint,
  http: [port: {:system, "PORT"}],
  debug_errors: true,
  check_origin: false,
  cache_static_manifest: "priv/static/manifest.json"


# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Configure your database
config :adpq, Adpq.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "adpq_develop",
  password: System.get_env("RDS_PASSWORD"),
  database: "adpq_develop",
  hostname: "adpq-develop.cuhwr9egpxgb.us-west-1.rds.amazonaws.com",
  pool_size: 10

config :adpq, AdpqWeb.Endpoint,
  secret_key_base: "Y8xMqKI4RKA19P9K3CG4AnaYtf1eu8GqTmZyxMlluiyV12j/3Nki+WC83S9e3XVe"

# Honeybadger
#config :honeybadger, environment_name: :staging

config :adpq, swagger_host: "staging.adpq.labzero.com"