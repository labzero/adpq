{:ok, _} = Application.ensure_all_started(:ex_machina)
alias Adpq.{Repo, CatalogItem, CartItem, User}
import Adpq.Factory
