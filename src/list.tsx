import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { List, LocalStorage } from "@raycast/api";
import { Repository, State, InitialState, Provider } from "./types";
import { EmptyView, RepositoryListItem } from "./components";

function RepositoryList() {
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

  const handleAdd = useCallback(
    (name: string, url: string, provider: string) => {
      const newRepositories = [...state.repositories, { id: nanoid(), name, url, provider, priority: 0 }];

      setState((previous) => ({ ...previous, repositories: newRepositories, searchText: "", filter: "All" }));
    },
    [state.repositories, setState]
  );

  const handleEdit = useCallback(
    (id: string, name: string, url: string, provider: string) => {
      let newRepositories = [...state.repositories];
      newRepositories = newRepositories.filter((repository) => {
        return repository.id !== id;
      });
      newRepositories.push({ id, name, url, provider, priority: 0 });

      setState((previous) => ({ ...previous, repositories: newRepositories, searchText: "", filter: "All" }));
    },
    [state.repositories, setState]
  );

  const handleOpen = useCallback(
    (id: string) => {
      let newRepositories = [...state.repositories];
      const currentRepository = newRepositories.filter((repository) => {
        return repository.id === id;
      })[0];
      currentRepository.priority = (currentRepository.priority ?? 0) + 1;

      newRepositories = newRepositories.filter((repository) => {
        return repository.id !== id;
      });
      newRepositories.push(currentRepository);

      setState((previous) => ({ ...previous, repositories: newRepositories, searchText: "", filter: "All" }));
    },
    [state.repositories, setState]
  );

  const handleRemove = useCallback(
    (id: string) => {
      let newRepositories = [...state.repositories];
      newRepositories = newRepositories.filter((repository) => {
        return repository.id !== id;
      });

      setState((previous) => ({ ...previous, repositories: newRepositories }));
    },
    [state.repositories, setState]
  );

  const handleResetPriority = useCallback(
    () => {
      const newRepositories = [...state.repositories];
      newRepositories.map((repository) => {
        repository.priority = 0;
      });

      setState((previous) => ({ ...previous, repositories: newRepositories }));
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
        .sort((a, b) => {
          return b.priority - a.priority;
        })
        .filter((repository) => {
          return state.filter === "All" || repository.provider === state.filter;
        })
        .map((repository) => (
          <RepositoryListItem
            repository={repository}
            searchText={state.searchText}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onOpen={handleOpen}
            onResetPriority={handleResetPriority}
          />
        ))}
    </List>
  );
}

export default RepositoryList;
