defmodule Adpq.AuthController do
  use Adpq.Web, :controller
  use PhoenixSwagger

  alias Adpq.{User, Repo}

  swagger_path :create do
    post "/api/auth"
    description "exchange credentials for an authorization \"token\""
    produces "application/json"
    parameter "body", :body, :object, "name and password", required: true, schema: Schema.ref(:AuthRequest)
    response 200, "OK", Schema.ref(:User)
    response 401, "Unauthorized"
    response 404, "Not Found"
  end

  def create(conn, %{"name" => _, "password" => "user"} = params) do
    user = User.find_or_create_by_name(Map.put(params, "role", "USER"))
    render(conn, "show.json", auth: user)
  end

  def create(conn, %{"name" => "admin", "password" => "admin"}) do
    user = Repo.get_by!(User, name: "admin")
    render(conn, "show.json", auth: user)
  end

  def create(conn, _) do
    send_resp(conn, :unauthorized, "")
  end

  def swagger_definitions do
    %{
      AuthRequest: swagger_schema do
        title "Authorization Request"
        description "name and password"
        properties do
          name :string, "username", required: true
          password :string, "password", required: true
        end
      end,
      User: swagger_schema do
        title "User"
        description "User Information"
        properties do
          id :integer, "User ID", required: true
          name :string, "username", required: true
          role :string, "role", required: true, enum: ["USER", "ADMIN"]
        end
      end
    }
  end

end
