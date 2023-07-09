import React from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import RepositoryItemPageContainer from "./RepositoryItemPageContainer";
import { GET_REPOSITORY_AND_REVIEWS } from "../graphql/queries";

const RepositoryItemPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY_AND_REVIEWS, {
    fetchPolicy: "cache-and-network",
    skip: !id,
    variables: { repositoryId: id },
  });
  if (loading) return <></>;
  if (error) return <></>;
  return (
    <RepositoryItemPageContainer
      repository={data.repository}
      reviews={data.repository.reviews}
    />
  );
};

export default RepositoryItemPage;
