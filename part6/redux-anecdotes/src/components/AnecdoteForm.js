import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify, revokeNotification } from '../reducers/notificationReducer'
const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote({ content, id: getId(), votes: 0 }))

      dispatch(notify(`Anecdote '${content}' created`))
      setTimeout(() => dispatch(revokeNotification()), 5000)
    }

    return (
        <div><h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
      </div>
    )
}

export default AnecdoteForm