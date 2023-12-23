import { useLayoutEffect } from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import IconButton from "../components/GUI/IconButton";
import RegisteredUsers from "../registered_users/RegisteredUsres";

//const USERS = ["איצקי", "משה", "חיים", "עוד דליה אביאל", "נועם"];

function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    //console.log(JSON.stringify(navigation.route.name, null, 2));
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            iconText="הוסף איש קשר"
            title="Tap Me"
            onPress={headerButtonPressHandler}
          />
        );
      },
    });
  }, [navigation]);

  function headerButtonPressHandler() {
    console.log("PRESS HomeScreen");
    navigation.navigate("Contacts");
  }

  return (
    <View style={styles.homeScreenView}>
      <RegisteredUsers />
      <View style={styles.title}>
        <Text>HmeScreen3</Text>
      </View>
      <View style={styles.scrollViewContainer}></View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenView: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  scrollViewContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flex: 1,
    minWidth: "60%",
    marginBottom: 10,
    borderColor: "#000",
    borderWidth: 2,
    paddingLeft: 5,
    paddingRight: 0,
  },
});
