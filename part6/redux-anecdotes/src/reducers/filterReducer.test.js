import deepFreeze from 'deep-freeze'
import filterReducer,  {initialState} from './filterReducer'

describe('filter reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = filterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('filter is changed', () => {

    const state = initialState

    deepFreeze(state)

    const action = {
      type: 'filters/filterChange',
      payload: "new filter value" 
    }

    const newState = filterReducer(state, action)
    expect(newState).toEqual(action.payload)
  })
})