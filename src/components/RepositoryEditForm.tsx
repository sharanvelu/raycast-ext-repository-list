import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import { Provider, Repository } from "../types";

function RepositoryEditForm(props: {
  repository: Repository;
  onEdit: (repositoryId: string, name: string, url: string, provider: string) => void;
}) {
  const { repository, onEdit } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback((values: { name: string; url: string; provider: string }) => {
      onEdit(repository.id, values.name, values.url, values.provider);
      pop();
    },
    [onEdit, pop, repository.id]
  );

  return (
    <Form
      navigationTitle={"Add Repository"}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Repository" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >

      <Form.TextField id="name" defaultValue={repository.name} title="Name" />

      <Form.Dropdown id="provider" title="Provider" defaultValue={repository.provider}>
        {Provider.map((value) => {
          return <Form.Dropdown.Item title={value.name} value={value.key} />;
        })}
      </Form.Dropdown>

      <Form.TextField id="url" title="Url" defaultValue={repository.url} />
    </Form>
  );
}

export default RepositoryEditForm;
