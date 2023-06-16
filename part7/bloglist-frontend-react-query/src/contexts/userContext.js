import { createContext, useReducer, useContext } from "react";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userDispatch = useContext(UserContext);
  return userDispatch[0];
};

export const useUserDispatch = () => {
  const userDispatch = useContext(UserContext);
  return userDispatch[1];
};

export default UserContext;
