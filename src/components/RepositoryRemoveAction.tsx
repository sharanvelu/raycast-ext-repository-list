import { Action, Icon } from "@raycast/api";

function RepositoryRemoveAction(props: { repositoryId: string; onRemove: (id: string) => void }) {
  return (
    <Action
      icon={Icon.Trash}
      title="Remove Repository"
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={() => props.onRemove(props.repositoryId)}
    />
  );
}

export default RepositoryRemoveAction;
