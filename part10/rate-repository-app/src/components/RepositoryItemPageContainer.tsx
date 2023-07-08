import React from "react";
import RepositoryItem from "./RepositoryItem";
import { IRepositoryPageItem } from "../types";

interface IRepositoryItemPageProps {
  repository: IRepositoryPageItem;
}
const RepositoryItemPageContainer = ({
  repository,
}: IRepositoryItemPageProps) => {
  return <RepositoryItem item={repository} repositoryButton />;
};

export default RepositoryItemPageContainer;
