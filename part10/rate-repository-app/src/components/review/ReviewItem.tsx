import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";

import Text from "../Text";
import { IReviewItem } from "../../types";
import dayjs from "dayjs";
import theme from "../../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../../hooks/useDeleteReview";
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 20,
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
  repositoryId: string;
  myReview?: boolean;
  refetchReviews?: any;
}

const ReviewItem = ({
  repositoryId,
  review,
  myReview = false,
  refetchReviews,
}: ReviewItemProps) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const onPressViewRepository = () => {
    navigate(`/repositories/${repositoryId}`);
  };

  const onPressDeleteReview = async (id: string) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deletingReview(id);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const deletingReview = async (id: string) => {
    const { data } = await deleteReview(id);
    if (data && data.deleteReview) {
      refetchReviews();
    } else {
      throw new Error("Review not deleted");
    }
  };
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
      {myReview ? (
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary.toString()}
            onPress={onPressViewRepository}
          >
            View repository
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.warning.toString()}
            onPress={() => {
              onPressDeleteReview(review.id);
            }}
          >
            Delete review
          </Button>
        </View>
      ) : null}
    </View>
  );
};

export default ReviewItem;
