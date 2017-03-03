FROM bitwalker/alpine-elixir-phoenix:latest

# Install dependencies
RUN apk add --no-cache python=2.7.12-r0 make gcc g++

# Build Environment
ARG RDS_PASSWORD

ARG MIX_ENV
ENV MIX_ENV ${MIX_ENV:-prod}
ARG RDS_PASSWORD
ENV RDS_PASSWORD ${RDS_PASSWORD:-nopassword}

# Set exposed ports
EXPOSE 4000
ENV PORT=4000

# Cache elixir deps
ADD mix.exs mix.lock ./
RUN mix do deps.get, deps.compile

# Same with npm deps
ADD package.json package.json
RUN npm install

ADD . .

# Run frontend build, compile, and digest assets
RUN brunch build --production && \
    mix do compile, phoenix.digest
RUN mix phoenix.swagger.generate priv/swagger/swagger.json
RUN mkdir -p _build/prod/lib/adpq/priv/swagger/
RUN cp priv/swagger/swagger.json _build/prod/lib/adpq/priv/swagger/swagger.json

CMD ["mix", "do", "ecto.migrate,", "phoenix.server"]