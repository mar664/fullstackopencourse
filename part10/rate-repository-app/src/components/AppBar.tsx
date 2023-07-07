import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";
import { useAuthStorage } from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

const AppBar = ({ loggedIn, setLoggedIn }) => {
  console.log(loggedIn);
  const authStorage = useAuthStorage();

  const signout = async () => {
    await authStorage.removeAccessToken();
    setLoggedIn(null);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {loggedIn ? (
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
