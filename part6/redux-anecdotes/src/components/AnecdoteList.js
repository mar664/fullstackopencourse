
import { updateVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => { 
        if ( state.filter !== "ALL"){
            return state.anecdotes.filter(s => s.content.indexOf(state.filters) !== -1)
        }
        return state.anecdotes
     })
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        dispatch(updateVote(anecdote))

        dispatch(displayNotification(`You voted for '${anecdote.content}'`))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
}

export default AnecdoteList