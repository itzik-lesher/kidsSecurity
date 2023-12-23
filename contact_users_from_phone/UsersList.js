import { useState, useEffect, useContext } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import { AllContext } from "../store/context/all-context";
import { insertUser } from "../util/database";

function UsersList() {
  const [contacts, setContacts] = useState([]);
  const [tempContacts, setTempContsacts] = useState([]);

  let [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const navigation = useNavigation();

  const allContext = useContext(AllContext);

  function headerButtonPressHandler() {
    //console.log("PRESS");
  }

  // allContext.addUserName("dddd");
  ///allContext.addPhoneNumber("78787");
  //allContext.addPhoneNumber(99999);
  useEffect(() => {
    //console.log("useeffect in UsersList");
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const ContactsFiltered = data.filter((item, index) => {
            return (
              item.firstName !== undefined &&
              item.firstName.length > 0 &&
              data[index - 1].firstName !== item.firstName &&
              item.name !== undefined &&
              item.name.length > 0 &&
              data[index - 1].name !== item.name
            );
          });
          //setContacts(ContactsFiltered);
          //setContacts(data);
          setContacts([...ContactsFiltered]);
          setTempContsacts([...ContactsFiltered]);
          console.log("data.length > 0");
        } else {
          console.log("data.length < 0");
          setError("No contacs available");
        }
      } else {
        // if (status === "granted") {
        setError("Permission to access contacts denied");
      }
    })();
    //allContext.addUserNameCtx("dddd");
    //allContext.addPhoneNumberCtx("99999999999");
    // just to see if reconized in context
    //console.log(
    //  " LLLLLLLLLLLLLLL AllContext.addedUser =" +
    //    JSON.stringify(allContext, null, 2)
    //);
  }, []);

  const onChangeSelectedUserHandler = (enteredText) => {
    setSelectedUser(enteredText);
    //console.log("enteredText =" + enteredText);
    let fiteredUser = contacts.filter((contact, index) => {
      //if (index === 100) {
      //  console.log("contact.firstName =" + JSON.stringify(contact, null, 2));
      //}
      return (
        (contact.firstName && contact.firstName.indexOf(enteredText) >= 0) ||
        (contact.name && contact.name.indexOf(enteredText) >= 0) ||
        (contact.lastName && contact.lastName.indexOf(enteredText) >= 0)
      );
    });
    setTempContsacts(fiteredUser);
  };

  const onAddContactHandler = async (index, e) => {
    //  "tempContacts[index]=" + JSON.stringify(tempContacts[index], null, 2)
    //);
    const phoneNumber = tempContacts[index].phoneNumbers[0].number;
    //console.log("phone =" + phoneNumber);
    const name = tempContacts[index].name;
    // give an id according to name
    const id = tempContacts[index].name;
    //console.log("name =" + name);
    allContext.addRegisteredUserCtx([id, name, phoneNumber]);
    // add also user to database
    await insertUser({ name: name, tel: phoneNumber });
    // move automatically to HomeScreen
    navigation.navigate("HomeScreen");
  };

  const users = (
    <View style={styles.usersListView}>
      <TextInput
        style={styles.textInput}
        keyboardType="default"
        maxLength={20}
        placeholder="הכנס שם או חלק ממנו"
        onChangeText={onChangeSelectedUserHandler}
        value={selectedUser}
      />
      <Text>Home</Text>
      {tempContacts !== undefined ? (
        <FlatList
          data={tempContacts}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.userLine}>
              <Text
                onPress={onAddContactHandler.bind(this, index)}
                style={styles.name}
              >
                {item.name}
              </Text>

              <Text
                style={styles.fontNumber}
                onPress={onAddContactHandler.bind(this, index)}
              >
                {item.phoneNumbers &&
                item.phoneNumbers[0] &&
                item.phoneNumbers[0].number
                  ? item.phoneNumbers[0].number
                  : null}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      ) : null}
    </View>
  );

  return users;
}

export default UsersList;

const styles = StyleSheet.create({
  usersListView: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "95%",
    paddingLeft: 10,
    flexWrap: "wrap",
  },
  name: {
    fontSize: 14,
  },
  fontNumber: {
    fontSize: 14,
    color: "#000",
    minWidth: "40%",
  },
  textInput: {
    minHeight: 50,
    minWidth: "75%",
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 2,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
