import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import successNotificationReducer from "./reducers/successNotificationReducer";
import errorNotificationReducer from "./reducers/errorNotificationReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    successNotification: successNotificationReducer,
    errorNotification: errorNotificationReducer,
    blogs: blogReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
