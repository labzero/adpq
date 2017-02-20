defmodule Adpq.Router do
  use Adpq.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Corsica, origins: "*"
  end

  scope "/api", Adpq do
    pipe_through :api
    resources "/catalog_items", CatalogItemController, except: [:new, :edit]
  end

  scope "/", Adpq do
    pipe_through :browser # Use the default browser stack
    get "/*path", PageController, :index
  end

  def swagger_info do
    %{
      info: %{
        version: "0.1",
        title: "Lab Zero - ADPQ",
        base_path: "/api",
        produces: "application/json"
      }
    }
  end
end
