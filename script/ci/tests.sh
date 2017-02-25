#!/bin/bash

export MIX_ENV="test"
export PATH="$HOME/dependencies/erlang/bin:$HOME/dependencies/elixir/bin:$PATH"

mix test
mix phoenix.swagger.generate priv/swagger/swagger.json
npm test
