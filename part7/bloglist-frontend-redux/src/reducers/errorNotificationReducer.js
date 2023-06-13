import { createSlice } from "@reduxjs/toolkit";

const errorNotificationSlice = createSlice({
  name: "errorNotification",
  initialState: null,
  reducers: {
    setErrorNotification(state, action) {
      return action.payload;
    },
    clearErrorNotification(_state, _action) {
      return null;
    },
  },
});

export const { setErrorNotification, clearErrorNotification } =
  errorNotificationSlice.actions;

export const showErrorNotification = (message) => {
  return async (dispatch) => {
    dispatch(setErrorNotification(message));
    setTimeout(() => dispatch(clearErrorNotification()), 5000);
  };
};

export default errorNotificationSlice.reducer;
