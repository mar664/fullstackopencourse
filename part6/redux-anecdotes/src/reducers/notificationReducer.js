import { createSlice } from '@reduxjs/toolkit'
export const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    revokeNotification(state, action) {
      return null
    }
  },
})

export const { notify, revokeNotification } = notificationSlice.actions

export const displayNotification = (content, timeout=5) => {
  return async dispatch => {
    dispatch(notify(content))
    setTimeout(() => dispatch(revokeNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer