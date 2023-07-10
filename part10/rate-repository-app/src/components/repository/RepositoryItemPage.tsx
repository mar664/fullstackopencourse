import React, { useState } from "react";
import { useParams } from "react-router-native";
import useRepositoriesAndReviews from "../../hooks/useRepositoriesAndReviews";
import { RepositoryItemPageContainer } from "./RepositoryItemPageContainer";

const RepositoryItemPage = () => {
  const { id } = useParams();
  const { repository, reviews, fetchMore, refetch } = useRepositoriesAndReviews(
    id,
    2
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onEndReach = () => {
    fetchMore();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!repository) {
    return null;
  }
  return (
    <RepositoryItemPageContainer
      repository={repository}
      reviews={reviews}
      onEndReach={onEndReach}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default RepositoryItemPage;
