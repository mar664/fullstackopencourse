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
  onEndReach: () => void;
  refreshing: boolean;
  onRefresh: () => void;
}

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryItemPageContainer extends React.Component<IRepositoryItemPageProps> {
  renderHeader = () => {
    return <RepositoryItem item={this.props.repository} repositoryButton />;
  };
  
  render = () => {
    const reviewNodes = this.props.reviews
      ? this.props.reviews.edges.map((edge) => edge.node)
      : [];
    const { id: repositoryId } = this.props.repository;
    return (
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => (
          <ReviewItem repositoryId={repositoryId} review={item} />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        ListHeaderComponent={this.renderHeader}
      />
    );
  };
}
