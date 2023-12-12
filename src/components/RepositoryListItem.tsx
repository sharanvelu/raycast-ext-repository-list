import { Repository, Provider } from "../types";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { RepositoryAddAction, RepositoryRemoveAction, RepositoryEditAction } from "./index";

function RepositoryListItem(props: {
  repository: Repository;
  searchText: string;
  onAdd: (name: string, url: string, provider: string) => void;
  onEdit: (repositoryId: string, name: string, url: string, provider: string) => void;
  onRemove: (repositoryId: string) => void;
  onOpen: (repositoryId: string) => void;
  onResetPriority: () => void;
}) {
  const { repository, searchText, onAdd, onEdit, onRemove, onOpen, onResetPriority } = props;

  const getProvider = (providerKey: string): string => {
    const provider = Provider.find((provider) => provider.key === providerKey);
    return provider?.name ?? "-";
  };

  const getPullRequestURL = (repository: Repository): string => {
    const url: string = repository.url;

    switch (repository.provider) {
      case "bitbucket":
        return url + "/pull-requests";
      case "github":
        return url + "/pulls";
    }

    return url;
  };

  const getNewPullRequestURL = (repository: Repository): string => {
    const url: string = repository.url;

    switch (repository.provider) {
      case "bitbucket":
        return url + "/pull-requests/new";
      case "github":
        return url + "/compare";
    }

    return url;
  };

  return (
    <List.Item
      id={repository.id}
      key={repository.id}
      title={repository.name}
      subtitle={getProvider(repository.provider)}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser
              url={repository.url}
              title="Open Repository"
              icon={Icon.Globe}
              onOpen={() => onOpen(repository.id)}
            />
            <Action.OpenInBrowser
              url={getPullRequestURL(repository)}
              title="Open Pull Request"
              shortcut={{ modifiers: ["opt"], key: "p" }}
              icon={Icon.Globe}
              onOpen={() => onOpen(repository.id)}
            />
            <Action.OpenInBrowser
              url={getNewPullRequestURL(repository)}
              title="New Pull Request"
              shortcut={{ modifiers: ["opt"], key: "n" }}
              icon={Icon.Globe}
              onOpen={() => onOpen(repository.id)}
            />
            <Action.CopyToClipboard content={repository.url} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <RepositoryEditAction repository={repository} onEdit={onEdit} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <RepositoryAddAction defaultTitle={searchText} onAdd={onAdd} />
            <RepositoryRemoveAction repositoryId={repository.id} onRemove={onRemove} />
            <Action
              icon={Icon.ArrowClockwise}
              title="Reset Ranking"
              shortcut={{ modifiers: ["ctrl"], key: "r" }}
              onAction={onResetPriority}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

export default RepositoryListItem;
