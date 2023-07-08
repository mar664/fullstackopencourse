import useRepositories from "../hooks/useRepositories";
import { RepositoryListContainer } from "./RepositoryListContainer";


const RepositoryList = () => {
  const { data, error, loading } = useRepositories();
  if (loading) return <></>;
  if (error) return <></>;

  console.log(data);
  return <RepositoryListContainer repositories={data} />;
};

export default RepositoryList;
