import { useNavigate } from "react-router-native";
import useRepositories from "../../hooks/useRepositories";
import { IRepositoryBaseItem } from "../../types";
import { RepositoryListContainer } from "./RepositoryListContainer";

const RepositoryList = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useRepositories();
  if (loading) return <></>;
  if (error) return <></>;

  const pressHandler = (item: IRepositoryBaseItem) => {
    navigate(`/repositories/${item.id}`);
  };

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      pressHandler={pressHandler}
    />
  );
};

export default RepositoryList;
