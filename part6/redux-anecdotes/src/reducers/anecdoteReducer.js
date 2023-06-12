import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    incrementVotes: (state, action) => {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, incrementVotes, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer