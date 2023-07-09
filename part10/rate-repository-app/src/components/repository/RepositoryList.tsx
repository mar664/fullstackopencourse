import React, { useState } from "react";

import { useNavigate } from "react-router-native";
import useRepositories from "../../hooks/useRepositories";
import { IRepositoryBaseItem, RepositorySortType } from "../../types";
import { RepositoryListContainer } from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState<RepositorySortType>(
    RepositorySortType.LowestRated
  );
  const navigate = useNavigate();
  const { data, error, loading } = useRepositories(sortBy);
  if (loading) return <></>;
  if (error) return <></>;

  const pressHandler = (item: IRepositoryBaseItem) => {
    navigate(`/repositories/${item.id}`);
  };

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      pressHandler={pressHandler}
      sort={[sortBy, setSortBy]}
    />
  );
};

export default RepositoryList;
