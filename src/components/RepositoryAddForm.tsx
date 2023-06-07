import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import { Provider } from "../types";

function RepositoryAddForm(props: {
  defaultTitle?: string;
  onCreate: (name: string, url: string, provider: string) => void;
}) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { name: string; url: string; provider: string }) => {
      onCreate(values.name, values.url, values.provider);
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

      <Form.Dropdown id="provider" title="Provider">
        {Provider.map((value) => {
          return <Form.Dropdown.Item title={value.name} value={value.key} />;
        })}
      </Form.Dropdown>

      <Form.TextField id="url" title="Url" />
    </Form>
  );
}

export default RepositoryAddForm;
