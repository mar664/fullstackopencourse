import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";
import { useAuthStorage } from "../contexts/AuthStorageContext";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <></>;
  if (error) return <></>;

  const signout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {data.me ? (
          <>
            <Link to="/repositories">
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  padding: 20,
                }}
              >
                Repositories
              </Text>
            </Link>
            <Pressable onPress={signout}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  padding: 20,
                }}
              >
                Signout
              </Text>
            </Pressable>
          </>
        ) : (
          <Link to="/signin">
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                padding: 20,
              }}
            >
              Sign In
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
