import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import { useEffect, useState } from "react";
import { useAuthStorage } from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const authStorage = useAuthStorage();
  const [loggedIn, setLoggedIn] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await authStorage.getAccessToken();

      if (token) setLoggedIn(token);
    };
    fetchData();
  }, [loggedIn]);
  return (
    <View style={styles.container}>
      <AppBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        {loggedIn ? (
          <Route path="/repositories" element={<RepositoryList />} />
        ) : (
          ""
        )}{" "}
        <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
