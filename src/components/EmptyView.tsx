import { ActionPanel, List } from "@raycast/api";
import { Repository } from "../types";
import RepositoryAddAction from "./RepositoryAddAction";

function EmptyView(props: {
  repositories: Repository[];
  searchText: string;
  onAdd: (name: string, url: string) => void;
}) {
  if (props.repositories.length > 0) {
    return (
      <List.EmptyView
        icon="😕"
        title="No matching repositories found"
        description={`Can't find a repository matching the entered text.\n'${props.searchText}'\nCreate it now!`}
        actions={
          <ActionPanel>
            <RepositoryAddAction defaultTitle={props.searchText} onAdd={props.onAdd} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List.EmptyView
      icon="📝"
      title="No repos found"
      description="You don't have any repositories yet. Why not add some?"
      actions={
        <ActionPanel>
          <RepositoryAddAction defaultTitle={props.searchText} onAdd={props.onAdd} />
        </ActionPanel>
      }
    />
  );
}

export default EmptyView;
