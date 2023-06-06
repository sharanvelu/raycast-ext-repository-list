import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";

function RepositoryAddForm(props: { defaultTitle?: string; onCreate: (name: string, url: string) => void }) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { name: string; url: string }) => {
      onCreate(values.name, values.url);
      pop();
    },
    [onCreate, pop]
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
      <Form.TextField id="name" defaultValue={defaultTitle} title="Name" />

      <Form.TextField id="url" title="Url" />
    </Form>
  );
}

export default RepositoryAddForm;
