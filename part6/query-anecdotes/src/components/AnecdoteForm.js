import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote,{
    onSuccess: (anecdote) => {
      dispatch({ type: "SHOW", payload: `Anecdote added: '${anecdote.content}'`})
      setTimeout(() => dispatch({ type: "HIDE" }), 5000)
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error, variables, context) => {
      dispatch({ type: "SHOW", payload: error.response.data.error})
      setTimeout(() => dispatch({ type: "HIDE" }), 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
