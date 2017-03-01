# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :adpq,
  ecto_repos: [Adpq.Repo]

# Configures the endpoint
config :adpq, Adpq.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bkNRjLa0xbNDeph42U9DvTZJ+/fI+Xlnvq7GiyxxZ2HmXUtoWfx45F4bRgfH6qHF",
  render_errors: [view: Adpq.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Adpq.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Honeybadger
config :honeybadger,
  api_key: System.get_env("HONEYBADGER_API_KEY"),
  exclude_envs: [:test, :dev],
  environment_name: :dev

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
