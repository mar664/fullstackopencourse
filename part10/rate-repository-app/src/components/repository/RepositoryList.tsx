import React, { useState } from "react";

import { useNavigate } from "react-router-native";
import useRepositories from "../../hooks/useRepositories";
import { IRepositoryBaseItem, RepositorySortType } from "../../types";
import { RepositoryListContainer } from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState<RepositorySortType>(
    RepositorySortType.Latest
  );

  const [searchBy, setSearchBy] = useState<string>("");

  const navigate = useNavigate();
  const { repositories, fetchMore, refetch } = useRepositories(
    sortBy,
    searchBy,
    4
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  console.log(repositories);
  const pressHandler = (item: IRepositoryBaseItem) => {
    navigate(`/repositories/${item.id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      pressHandler={pressHandler}
      sortBy={sortBy}
      setSortBy={setSortBy}
      setSearchBy={setSearchBy}
      onEndReach={onEndReach}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default RepositoryList;
