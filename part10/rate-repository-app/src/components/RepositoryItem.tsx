import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import { IRepositoryItem } from "../types";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
  },
  avatar: {
    width: 66,
    height: 58,
    margin: 20,
    marginTop: 10,
    borderRadius: 5,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    padding: 20,
  },
});

interface RepositoryItemProps {
  item: IRepositoryItem;
}

const RepositoryItem = ({ item }: RepositoryItemProps) => {
  return (
    <View testID="repositoryItem">
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
          testID="repositoryItemImage"
        />
        <View style={{ flexShrink: 1 }}>
          <Text
            testID="repositoryItemFullName"
            bold
            style={{ padding: 5, fontSize: 18, paddingLeft: 0 }}
          >
            {item.fullName}
          </Text>
          <Text
            testID="repositoryItemDescription"
            style={{ padding: 8, paddingLeft: 0 }}
          >
            {item.description}
          </Text>
          <Text
            testID="repositoryItemLanguage"
            blueBackground
            style={{ padding: 5, alignSelf: "flex-start" }}
          >
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text testID="repositoryItemStarCount" bold alignCenter>
            {item.stargazersCount >= 1000
              ? `${(item.stargazersCount / 1000).toFixed(1)}k`
              : item.stargazersCount}
          </Text>
          <Text alignCenter>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text testID="repositoryItemForksCount" bold alignCenter>
            {item.forksCount >= 1000
              ? `${(item.forksCount / 1000).toFixed(1)}k`
              : item.forksCount}
          </Text>
          <Text alignCenter>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text testID="repositoryItemReviewCount" bold alignCenter>
            {item.reviewCount >= 1000
              ? `${(item.reviewCount / 1000).toFixed(1)}k`
              : item.reviewCount}
          </Text>
          <Text alignCenter>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text testID="repositoryItemRatingAverage" bold alignCenter>
            {item.ratingAverage}
          </Text>
          <Text alignCenter>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
