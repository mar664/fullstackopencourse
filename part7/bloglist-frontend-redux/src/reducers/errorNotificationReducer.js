const initialState = ''

const errorNotificationReducer = (state = initialState, action) => {
  if (action.type === 'SHOW_ERROR') {
    return action.payload
  } else if (action.type === 'HIDE_ERROR') {
    return ''
  }

  return state
}

export const showErrorNotification = (message) => {
  return {
    type: 'SHOW_ERROR',
    payload: message
  }
}

export const hideErrorNotification = () => {
  return {
    type: 'HIDE_ERROR',
    payload: ''
  }
}

export default errorNotificationReducer