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
    resources "/swagger_docs", SwaggerDocsController, only: [:index]
    resources "/auth", AuthController, only: [:create]
    scope "/" do # protected routes
      pipe_through [:api, Adpq.LoadUser, Adpq.EnsureUser]
      resources "/catalog_items", CatalogItemController, except: [:new, :edit]
      resources "/user", UserController, only: [] do
        resources "/cart_items", CartItemController, except: [:new, :edit]
        resources "/orders", OrderController, except: [:delete]
      end
    end
    scope "/admin", Admin, as: :admin do
      pipe_through [:api, Adpq.LoadUser, Adpq.EnsureAdmin]
      resources "/orders", OrderController, only: [:index, :show, :update]
      resources "/catalog_items", CatalogItemController, only: [:index, :show, :update, :create]
    end
  end

  scope "/", Adpq do
    pipe_through :browser # Use the default browser stack
    get "/*path", PageController, :index
  end

  def swagger_info do
    %{
      securityDefinitions: %{
        ApiToken: %{
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "API Operations require a valid token."
        }
      },
      security: [
        %{ApiToken: []}
      ],
      info: %{
        version: "0.1",
        title: "Lab Zero - ADPQ"
      }
    }
  end
end
