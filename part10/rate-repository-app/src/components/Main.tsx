import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";

import RepositoryList from "./repository/RepositoryList";
import SignIn from "./signin/SignIn";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import RepositoryItemPage from "./repository/RepositoryItemPage";
import ReviewForm from "./review/ReviewForm";
import SignUp from "./signup/SignUp";
import MyReviewList from "./myreviews/MyReviewList";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <></>;
  if (error) return <></>;

  if (data.me) {
    return (
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/repositories/:id" element={<RepositoryItemPage />} />
          <Route path="/repositories" element={<RepositoryList />} />
          <Route path="/my_reviews" element={<MyReviewList />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="*" element={<Navigate to="/repositories" replace />} />
        </Routes>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </View>
    );
  }
};

export default Main;
