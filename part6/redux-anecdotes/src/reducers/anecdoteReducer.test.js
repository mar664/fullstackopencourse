import deepFreeze from 'deep-freeze'
import anecdoteReducer,  {initialState} from './anecdoteReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

describe('anecdotes reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
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

    const newState = anecdoteReducer(state, action)
    const finalState = state.map(a => (a.id === id) ? { ...a, votes: a.votes + 1 } : a)
    expect(newState).toEqual(finalState)
  })

  test('anecdote is added', () => {

    const state = initialState

    deepFreeze(state)
    const id = getId()
    const content = "This is a new Anecdote"

    const action = {
      type: 'NEW_ANECDOTE',
      payload: { id, content, votes: 0 } 
    }

    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual(state.concat({ id, content, votes: 0 }))
  })
})