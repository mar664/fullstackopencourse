import notificationReducer,  {initialState} from './notificationReducer'

describe('notification reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('notify is called', () => {
    const state = initialState

    const action = {
      type: 'notification/notify',
      payload: "new filter value" 
    }

    const newState = notificationReducer(state, action)
    expect(newState).toEqual(action.payload)
  })
})