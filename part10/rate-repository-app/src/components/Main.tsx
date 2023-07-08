import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import RepositoryItemPage from "./RepositoryItemPage";

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
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </View>
    );
  }
};

export default Main;
