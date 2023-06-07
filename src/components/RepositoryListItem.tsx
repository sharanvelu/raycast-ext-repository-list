import { Repository, Provider, State } from "../types";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { RepositoryAddAction, RepositoryRemoveAction, RepositoryEditAction } from "./index";

function RepositoryListItem(props: {
  repository: Repository;
  searchText: string;
  onAdd: (name: string, url: string, provider: string) => void;
  onEdit: (repositoryId: string, name: string, url: string, provider: string) => void;
  onRemove: (repositoryId: string) => void;
  state?: State
}) {
  const { repository, searchText, onAdd, onEdit, onRemove } = props;

  const getProvider = (providerKey: string): string => {
    const provider = Provider.find((provider) => provider.key === providerKey);
    return provider?.name ?? "-";
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
            <Action.OpenInBrowser url={repository.url} title="Open Repository" icon={Icon.Globe} />
            <Action.CopyToClipboard content={repository.url} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <RepositoryEditAction repository={repository} onEdit={onEdit} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <RepositoryAddAction defaultTitle={searchText} onAdd={onAdd} />
            <RepositoryRemoveAction repositoryId={repository.id} onRemove={onRemove} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

export default RepositoryListItem;
