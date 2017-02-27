defmodule Adpq.Factory do

  use ExMachina.Ecto, repo: Adpq.Repo

  def catalog_item_factory do
    %Adpq.CatalogItem{
      long_category: "Powerful Laptops for Serious Work",
      simple_category: "Power",
      top_level_category: "Laptops",
      clin: "B4789",
      contract_discount: 15,
      contract_unit_price: 100000,
      description: "High End Dell Laptop",
      list_price: 85000,
      manufacturer: "DELL",
      name: "XP-43",
      quantity_in_uom: 1,
      sku: "DL-1546",
      unit_of_measure: "1",
      unspc: "A4567"
    }
  end

  def user_factory do
    %Adpq.User{
      name: sequence("name-"),
      password: "user",
      role: "USER",
      department: Adpq.User.Department.random
    }
  end

  def admin_user_factory do
    %Adpq.User{
      name: "admin",
      password: "admin",
      role: "admin",
      department: Adpq.User.Department.random
    }
  end

  def cart_item_factory do
    %Adpq.CartItem{
      user: build(:user),
      catalog_item: build(:catalog_item),
      quantity: 1
    }
  end

  def order_factory do
    %Adpq.Order{
      user: build(:user),
      status: Adpq.Order.Status.submitted
    }
  end

  def order_with_items_factory do
    %Adpq.Order{
      user: build(:user),
      status: Adpq.Order.Status.submitted
    }

  end

  def order_item_factory do
    %Adpq.OrderItem{
      order: build(:order),
      catalog_item: build(:catalog_item),
      quantity: 1,
      price: 1000
    }
  end

  def order_with_items(user, num_items) do
    order = insert(:order, %{user: user})
    insert_list(num_items, :order_item, %{order: order})
    order
  end

end
