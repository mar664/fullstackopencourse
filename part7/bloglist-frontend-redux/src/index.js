import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import successNotificationReducer from "./reducers/successNotificationReducer";
import errorNotificationReducer from "./reducers/errorNotificationReducer";

const store = configureStore({
  reducer: {
    successNotification: successNotificationReducer,
    errorNotification: errorNotificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
