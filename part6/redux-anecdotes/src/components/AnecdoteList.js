
import { incrementVotes } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => { 
        if ( state.filter !== "ALL"){
            return state.anecdotes.filter(s => s.content.indexOf(state.filter) !== -1)
        }
        return state.anecdotes
     })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(incrementVotes(id))
      }

    return (
        <div>
        {[...anecdotes].sort((a, b) => a.votes - b.votes).reverse().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
}

export default AnecdoteList