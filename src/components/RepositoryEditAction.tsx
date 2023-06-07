import { Action, Icon } from "@raycast/api";
import { RepositoryEditForm } from "./index";
import { Repository } from "../types";

function RepositoryEditAction(props: {
  repository: Repository;
  onEdit: (repositoryId: string, name: string, url: string, provider: string) => void;
}) {
  const { repository, onEdit } = props;

  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Edit Repository"
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      target={<RepositoryEditForm repository={repository} onEdit={onEdit} />}
    />
  );
}

export default RepositoryEditAction;
