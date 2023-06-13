import { createSlice } from "@reduxjs/toolkit";

const successNotificationSlice = createSlice({
  name: "successNotification",
  initialState: null,
  reducers: {
    setSuccessNotification(state, action) {
      return action.payload;
    },
    clearSuccessNotification(_state, _action) {
      return null;
    },
  },
});

export const { setSuccessNotification, clearSuccessNotification } =
  successNotificationSlice.actions;

export const showSuccessNotification = (message) => {
  return async (dispatch) => {
    dispatch(setSuccessNotification(message));
    setTimeout(() => dispatch(clearSuccessNotification()), 5000);
  };
};

export default successNotificationSlice.reducer;
