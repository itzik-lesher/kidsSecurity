import { View, Text, ScrollView } from "react-native";
import { useContext, useEffect } from "react";
//import { DUMMY_REGISTERED_USERS } from "./DummyRegisteredUsers";
import { AllContext } from "../store/context/all-context";
import { fetchRegisteredUsers } from "../util/database";

function RegisteredUsers() {
  const allContext = useContext(AllContext);
  useEffect(() => {
    async function fechUsers() {
      const regUsers = await fetchRegisteredUsers();
      //console.log(
      //  "result fetching users in RegisteredUsers.js AAAAAAAAAA = " +
      //    JSON.stringify(regUsers.rows._array, null, 2)
      //);
      //console.log(
      //  "allContext.setRegsiteredUsersCtx(regUsers.rows._array) in in RegisteredUsers.js"
      //);
      allContext.setRegsiteredUsersCtx(regUsers.rows._array);
    }
    fechUsers();
  }, []);

  //console.log(
  // "registeredUsers in RegistedUsers =" +
  //   JSON.stringify(allContext.setRegsiteredUsersCtx, null, 2)
  //);
  const usersList = (
    <>
      <ScrollView>
        {allContext.registeredUsersCtx.map((user) => {
          return (
            <View key={user.id}>
              <Text>{user.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
  return (
    <View style={{ flex: 1 }}>
      <Text>Users Details</Text>
      {usersList}
    </View>
  );
}

export default RegisteredUsers;
