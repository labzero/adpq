defmodule AdpqWeb.ViewHelpers do

  @moduledoc """
    utility methods for views
  """

  def unix_timestamp(datetime) do
    datetime
    |> NaiveDateTime.to_erl
    |> :calendar.datetime_to_gregorian_seconds
    |> Kernel.-(62_167_219_200) # unix epoch
  end
end
