import { Repository, Provider, State } from "../types";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { RepositoryAddAction, RepositoryRemoveAction } from "./index";

function RepositoryListItem(props: {
  index: number,
  repository: Repository,
  state: State,
  onAdd: (name: string, url: string, provider: string) => void,
  onRemove: (index: number) => void
}) {

  const providerO = (providerKey: string): string => {
    const provider = Provider.find(provider => provider.key === providerKey);
    return provider?.name ?? "-";
  };

  return (
    <List.Item
      key={props.repository.id}
      title={props.repository.name}
      // subtitle={providerO(props.repository.provider)}
      subtitle={providerO(props.repository.provider)}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.OpenInBrowser url={props.repository.url} title="Open Repository" icon={Icon.Globe} />
            <Action.CopyToClipboard content={props.repository.url} />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <RepositoryAddAction defaultTitle={props.state.searchText} onAdd={props.onAdd} />
            <RepositoryRemoveAction onRemove={() => props.onRemove(props.index)} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

export default RepositoryListItem;
