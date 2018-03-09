# config/.credo.exs
%{
  configs: [
    %{
      name: "default",
      files: %{
        included: ["lib/", "src/", "web/", "apps/"],
        excluded: []
      },
      checks: [
        {Credo.Check.Consistency.TabsOrSpaces},
        {Credo.Check.Design.TagTODO, exit_status: 0},
        {Credo.Check.Consistency.MultiAliasImportRequireUse, false},
        {Credo.Check.Readability.MaxLineLength, priority: :low, max_length: 100},        
      ]
    }
  ]
}
