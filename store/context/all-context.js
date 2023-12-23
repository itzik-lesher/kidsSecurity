import { createContext, useState } from "react";
import { DUMMY_REGISTERED_USERS } from "../../registered_users/DummyRegisteredUsers";

export const AllContext = createContext({
  addedUserCtx: "testuser",
  addedPhoneNumberCtx: 4344340,
  registeredUsersCtx: DUMMY_REGISTERED_USERS,
  addRegisteredUserCtx: () => {},
  setRegsiteredUsersCtx: () => {},
});

// this is actuall component
function AllContextComponent({ children }) {
  const [registeredUsers, setRegsiteredUsers] = useState(
    DUMMY_REGISTERED_USERS
  );
  const [addedUserState, setAddedUserState] = useState({
    user: "",
    phone: 0,
  });

  const addRegisteredUser = (newUser) => {
    //console.log(newUser);
    setRegsiteredUsers((registeredUsers) => {
      //console.log(
      //  "registeredUsers in Context =" +
     //     JSON.stringify(registeredUsers, null, 2)
      );
      return [
        ...registeredUsers,
        { id: newUser[0], name: newUser[0], tel: newUser[1] },
      ];
    });
  };

  const contextxValue = {
    addedUserCtx: addedUserState.user,
    addedPhoneNumberCtx: addedUserState.phone,
    registeredUsersCtx: registeredUsers,
    addRegisteredUserCtx: addRegisteredUser,
    setRegsiteredUsersCtx: setRegsiteredUsers,
  };
  //console.log("contextxValue = " + JSON.stringify(contextxValue, null, 2));
  return (
    <AllContext.Provider value={contextxValue}>{children}</AllContext.Provider>
  );
}

export default AllContextComponent;
