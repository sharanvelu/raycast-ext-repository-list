import { Action, Icon } from "@raycast/api";
import RepositoryAddForm from "./RepositoryAddForm";

function RepositoryAddAction(props: {
  defaultTitle?: string;
  onAdd: (name: string, url: string, provider: string) => void
}) {
  return (
    <Action.Push
      icon={Icon.Plus}
      title="Add Repository"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<RepositoryAddForm defaultTitle={props.defaultTitle} onCreate={props.onAdd} />}
    />
  );
}

export default RepositoryAddAction;
