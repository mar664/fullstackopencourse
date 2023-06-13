const initialState = ''

const successNotificationReducer = (state = initialState, action) => {
  if (action.type === 'SHOW_SUCCESS') {
    return action.payload
  } else if (action.type === 'HIDE_SUCCESS') {
    return ''
  }

  return state
}

export const showSuccessNotification = (message) => {
  return {
    type: 'SHOW_SUCCESS',
    payload: message
  }
}

export const hideSuccessNotification = () => {
  return {
    type: 'HIDE_SUCCESS',
    payload: ''
  }
}

export default successNotificationReducer