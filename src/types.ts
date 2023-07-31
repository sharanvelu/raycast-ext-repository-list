interface Repository {
  id: string;
  name: string;
  provider: string;
  url: string;
  priority: number;
}

type State = {
  isLoading: boolean;
  searchText: string;
  filter: string;
  repositories: Repository[];
  visibleRepositories: Repository[];
};

const InitialState = {
  isLoading: true,
  searchText: "",
  filter: "All",
  repositories: [],
  visibleRepositories: [],
};

const Provider = [
  { key: "github", name: "Github", icon: "" },
  { key: "gitlab", name: "GitLab" },
  { key: "bitbucket", name: "Bitbucket" },
  { key: "aws-code-commit", name: "AWS CodeCommit" },
  { key: "git-bucket", name: "GitBucket" },
  { key: "others", name: "Others" },
];

export { InitialState, Provider };
export type { Repository };
export type { State };
