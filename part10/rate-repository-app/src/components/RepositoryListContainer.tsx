import React from "react";

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { IRepositoryBaseItem } from "../types";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: theme.separator,
});

const ItemSeparator = () => <View style={styles.separator} />;

interface IEdge {
  node: IRepositoryBaseItem;
}

interface IRepositoryListContainerProps {
  repositories: { edges: IEdge[] };
  // eslint-disable-next-line no-unused-vars
  pressHandler: (item: IRepositoryBaseItem) => void;
}

export const RepositoryListContainer = ({
  repositories,
  pressHandler,
}: IRepositoryListContainerProps) => {
  console.log(repositories);
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => pressHandler(item)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};
