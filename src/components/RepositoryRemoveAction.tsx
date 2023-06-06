import { Action, Icon } from "@raycast/api";

function RepositoryRemoveAction(props: { onRemove: () => void }) {
  return (
    <Action
      icon={Icon.Trash}
      title="Remove Repository"
      shortcut={{ modifiers: ["cmd"], key: "delete" }}
      onAction={props.onRemove}
    />
  );
}

export default RepositoryRemoveAction;
