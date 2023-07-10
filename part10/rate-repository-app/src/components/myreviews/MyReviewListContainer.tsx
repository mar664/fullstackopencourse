import React from "react";

import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "../review/ReviewItem";
import { IReviewItem } from "../../types";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: theme.separator,
});

const ItemSeparator = () => <View style={styles.separator} />;

interface IEdge {
  node: IReviewItem;
}

interface IReviewListContainerProps {
  reviews: { edges: IEdge[] };
  refetchReviews: any;
}

export class MyReviewListContainer extends React.Component<IReviewListContainerProps> {
  render = () => {
    const repositoryNodes = this.props.reviews
      ? this.props.reviews.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem
            repositoryId={item.repositoryId}
            review={item}
            myReview
            refetchReviews={this.props.refetchReviews}
          />
        )}
      />
    );
  };
}
