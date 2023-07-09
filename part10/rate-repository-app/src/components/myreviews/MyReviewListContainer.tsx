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
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    );
  };
}
