#!/bin/bash

export MIX_ENV="test"
export PATH="$HOME/dependencies/erlang/bin:$HOME/dependencies/elixir/bin:$PATH"

./node_modules/.bin/eslint web/static/js/**
mix credo --strict
mix test
npm test
