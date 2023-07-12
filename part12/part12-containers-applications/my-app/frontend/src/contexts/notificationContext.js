import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ERROR":
      return { type: "error", message: action.payload };
    case "SHOW_SUCCESS":
      return { type: "success", message: action.payload };
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    0
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationDispatch = useContext(NotificationContext);
  return notificationDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationDispatch = useContext(NotificationContext);
  return notificationDispatch[1];
};

export const showErrorMessage = (dispatch, message) => {
  dispatch({ type: "SHOW_ERROR", payload: message });
  setTimeout(
    () => dispatch({ type: "HIDE_NOTIFICATION", payload: message }),
    5000
  );
};

export const showSuccessMessage = (dispatch, message) => {
  dispatch({ type: "SHOW_SUCCESS", payload: message });
  setTimeout(
    () => dispatch({ type: "HIDE_NOTIFICATION", payload: message }),
    5000
  );
};

export default NotificationContext;
