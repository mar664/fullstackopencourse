import React from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItemPageContainer from "./RepositoryItemPageContainer";

const RepositoryItemPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    skip: !id,
    variables: { repositoryId: id },
  });
  if (loading) return <></>;
  if (error) return <></>;

  return <RepositoryItemPageContainer repository={data.repository} />;
};

export default RepositoryItemPage;
