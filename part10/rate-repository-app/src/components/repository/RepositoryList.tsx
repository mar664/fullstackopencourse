import React, { useState } from "react";

import { useNavigate } from "react-router-native";
import useRepositories from "../../hooks/useRepositories";
import { IRepositoryBaseItem, RepositorySortType } from "../../types";
import { RepositoryListContainer } from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState<RepositorySortType>(
    RepositorySortType.LowestRated
  );

  const [searchBy, setSearchBy] = useState<string>("");

  const navigate = useNavigate();
  const { repositories } = useRepositories(sortBy, searchBy);
  console.log(repositories);
  const pressHandler = (item: IRepositoryBaseItem) => {
    navigate(`/repositories/${item.id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      pressHandler={pressHandler}
      sortBy={sortBy}
      setSortBy={setSortBy}
      setSearchBy={setSearchBy}
    />
  );
};

export default RepositoryList;
