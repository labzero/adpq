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


  end

  scope "/api", Adpq do
    pipe_through :api
    resources "/catalog_items", CatalogItemController, except: [:new, :edit]
  end
  
  scope "/", Adpq do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Adpq do
  #   pipe_through :api
  # end
end
