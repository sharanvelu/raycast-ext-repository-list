import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, Action, List, LocalStorage, Icon } from "@raycast/api";
import { Repository, State } from "./types";
import InitialState from "./types";
import { RepositoryAddAction, RepositoryRemoveAction, EmptyView } from "./components";

export default function () {
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
    (name: string, url: string) => {
      const newRepositories = [...state.repositories, { id: nanoid(), name, url }];
      setState((previous) => ({ ...previous, repositories: newRepositories, searchText: "" }));
    },
    [state.repositories, setState]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newRepositories = [...state.repositories];
      newRepositories.splice(index, 1);
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
    >
      <EmptyView repositories={state.repositories} searchText={state.searchText} onAdd={handleAdd} />

      {state.repositories.map((repository, index) => (
        <List.Item
          key={repository.id}
          title={repository.name}
          subtitle={repository.url}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action.OpenInBrowser url={repository.url} title="Open Repository" icon={Icon.Globe} />
                <Action.CopyToClipboard content={repository.url} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <RepositoryAddAction defaultTitle={state.searchText} onAdd={handleAdd} />
                <RepositoryRemoveAction onRemove={() => handleRemove(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
