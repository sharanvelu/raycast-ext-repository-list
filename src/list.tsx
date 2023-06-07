import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { List, LocalStorage } from "@raycast/api";
import { Repository, State, InitialState, Provider } from "./types";
import { EmptyView, RepositoryListItem } from "./components";

export default function() {
  const [state, setState] = useState<State>(InitialState);

  useEffect(() => {
    (async () => {
      const storedRepositories = await LocalStorage.getItem<string>("repositories");

      if (!storedRepositories) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const repositories: Repository[] = JSON.parse(storedRepositories);
        setState((previous) => ({ ...previous, repositories, isLoading: false }));
      } catch (e) {
        // can't decode repositories
        setState((previous) => ({ ...previous, repositories: [], isLoading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    LocalStorage.setItem("repositories", JSON.stringify(state.repositories));
  }, [state.repositories]);

  const handleAdd = useCallback((name: string, url: string, provider: string) => {
      const newRepositories = [...state.repositories, { id: nanoid(), name, url, provider }];

      setState((previous) => ({ ...previous, repositories: newRepositories, searchText: "", filter: "All" }));
    },
    [state.repositories, setState]
  );

  const handleRemove = useCallback((index: number) => {
      const newRepositories = [...state.repositories];

      setState((previous) => ({ ...previous, repositories: newRepositories.splice(index, 1) }));
    },
    [state.repositories, setState]
  );

  return (
    <List
      isLoading={state.isLoading}
      searchText={state.searchText}
      searchBarPlaceholder={"Search Repositories"}
      enableFiltering
      navigationTitle={"Stored Repositories"}
      onSearchTextChange={(newValue) => {
        setState((previous) => ({ ...previous, searchText: newValue }));
      }}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Repository Provider"
          value={state.filter}
          onChange={(newValue) => setState((previous) => ({ ...previous, filter: newValue }))}
        >
          <List.Dropdown.Item title="All" value={"All"} />

          {Provider.map((value) => {
            return <List.Dropdown.Item title={value.name} value={value.key} />;
          })}
        </List.Dropdown>
      }
    >
      <EmptyView repositories={state.repositories} searchText={state.searchText} onAdd={handleAdd} />

      {state.repositories
        .filter((repository) => {
          return state.filter === "All" || repository.provider === state.filter;
        })
        .map((repository, index) => (
          <RepositoryListItem
            index={index}
            repository={repository}
            state={state}
            onAdd={handleAdd}
            onRemove={() => handleRemove(index)}
          />
        ))}
    </List>
  )
    ;
}
