defmodule Adpq.Factory do

  use ExMachina.Ecto, repo: Adpq.Repo

  def catalog_item_factory do
    %Adpq.CatalogItem{
      long_category: "some content",
      simple_category: "Power",
      top_level_category: "Laptops",
      clin: "some content",
      contract_discount: 42,
      contract_unit_price: 42,
      description: "some content",
      list_price: 42,
      manufacturer: "some content",
      name: "HP Laptop",
      quantity_in_uom: 42,
      sku: "some content",
      unit_of_measure: "some content",
      unspc: "some content"
    }
  end

  def user_factory do
    %Adpq.User{
      name: sequence("name-"),
      password: "user",
      role: "USER"
    }
  end

  def admin_user_factory do
    %Adpq.User{
      name: "admin",
      password: "admin",
      role: "admin"
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

end
