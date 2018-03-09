use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :adpq, AdpqWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :adpq, Adpq.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "adpq",
  password: "",
  database: "adpq_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

report_path = case System.get_env("CIRCLE_TEST_REPORTS") do
  nil  -> "_build"
  path -> path
end

# Honeybadger
#config :honeybadger, environment_name: :test

config :junit_formatter, report_dir: "#{report_path}/test"