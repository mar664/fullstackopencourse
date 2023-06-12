import deepFreeze from 'deep-freeze'
import annecdoteReducer,  {initialState} from '../reducers/anecdoteReducer'

describe('anecdotes reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = annecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('vote is incremented', () => {

    const state = initialState

    deepFreeze(state)
    const { id } = state[0]

    const action = {
      type: 'VOTE',
      payload: { id } 
    }

    const newState = annecdoteReducer(state, action)
    const finalState = state.map(a => (a.id === id) ? { ...a, votes: a.votes + 1 } : a)
    expect(newState).toEqual(finalState)
  })
})