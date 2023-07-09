import React from "react";

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { IRepositoryBaseItem, RepositorySortType } from "../../types";
import theme from "../../theme";
import RepositorySortSelection from "./RepositorySortSelection";

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
  sort: [
    RepositorySortType,
    React.Dispatch<React.SetStateAction<RepositorySortType>>,
  ];
}

export const RepositoryListContainer = ({
  repositories,
  pressHandler,
  sort,
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
      ListHeaderComponent={<RepositorySortSelection sort={sort} />}
    />
  );
};
