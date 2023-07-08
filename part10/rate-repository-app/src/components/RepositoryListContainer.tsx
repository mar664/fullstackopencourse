import React from "react";

import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { IRepositoryItem } from "../types";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface IEdge {
  node: IRepositoryItem;
}

interface IRepositoryListContainerProps {
  repositories: { edges: IEdge[] };
}

export const RepositoryListContainer = ({
  repositories,
}: IRepositoryListContainerProps) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};
