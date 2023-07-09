import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import { IReviewItem } from "../../types";
import dayjs from "dayjs";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    gap: 20,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 3,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});

interface ReviewItemProps {
  review: IReviewItem;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <View testID="reviewItem">
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text testID="reviewItemRating" bold style={{ textAlign: "center" }}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text testID="reviewItemUser" bold>
              {review.user.username}
            </Text>
          </View>
          <View>
            <Text testID="reviewItemDate">
              {dayjs(review.createdAt).format("DD.MM.YYYY")}
            </Text>
          </View>
          <View>
            <Text testID="reviewItemText">{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
