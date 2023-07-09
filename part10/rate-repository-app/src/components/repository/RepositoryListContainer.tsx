import React from "react";

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { IRepositoryBaseItem, RepositorySortType } from "../../types";
import theme from "../../theme";
import RepositoryListHeader from "./RepositoryListHeader";

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
  sortBy: RepositorySortType;
  setSortBy: React.Dispatch<React.SetStateAction<RepositorySortType>>;
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
}

export class RepositoryListContainer extends React.Component<IRepositoryListContainerProps> {
  componentWillUnmount(): void {
    console.log("bye5");
  }
  renderHeader = () => {
    return (
      <RepositoryListHeader
        sortBy={this.props.sortBy}
        setSortBy={this.props.setSortBy}
        setSearchBy={this.props.setSearchBy}
      />
    );
  };
  render = () => {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => this.props.pressHandler(item)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  };
}
