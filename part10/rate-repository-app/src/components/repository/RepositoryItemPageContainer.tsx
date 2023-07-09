import React from "react";
import RepositoryItem from "./RepositoryItem";
import { IRepositoryPageItem, IReviewItem } from "../../types";
import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "../review/ReviewItem";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: theme.separator,
});

interface IEdge {
  node: IReviewItem;
}

interface IRepositoryItemPageProps {
  repository: IRepositoryPageItem;
  reviews: { edges: IEdge[] };
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemPageContainer = ({
  repository,
  reviews,
}: IRepositoryItemPageProps) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} repositoryButton />
      )}
      // ...
    />
  );
};

export default RepositoryItemPageContainer;
