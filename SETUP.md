# Application Setup

## Installation of requirements

### Software Versions

  * Elixir 1.4.1 (Erlang/OTP 19 [erts-8.2])
  * Phoenix Framework 1.2.1
  * postgres (PostgreSQL) 9.6.2
  * Node.js 7.5.0
  * React 15.4.2

### MacOS
  1. Install Homebrew if not already installed `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  1. Update Homebrew `brew update`
  1. Install postgresql `brew install postgresql`
  1. Install node `brew install node`
  1. Install elixir `brew install elixir`
  1. Install mix `mix local.hex`
  1. Create PostgreSQL role `createuser -d adpq`
  1. Migrate schema `mix ecto.migrate`
  1. To add seed data to your database: `mix run priv/repo/seeds.exs`

### Linux

## Starting the application

  1. Install dependencies with `mix deps.get`
  1. Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  1. Install Node.js dependencies with `npm install`
  1. Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
