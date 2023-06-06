interface Repository {
  id: string;
  name: string;
  url: string;
}

type State = {
  isLoading: boolean;
  searchText: string;
  repositories: Repository[];
  visibleRepositories: Repository[];
};
const InitialState = {
  isLoading: true,
  searchText: "",
  repositories: [],
  visibleRepositories: [],
};

export type { State };
export type { Repository };
export default InitialState;
