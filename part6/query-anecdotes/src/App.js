import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation(updateAnecdote,
    {
      onSuccess: (anecdote) => {
        dispatch({ type: "SHOW", payload: `Anecdote '${anecdote.content}' voted on`})
        setTimeout(() => dispatch({ type: "HIDE" }), 5000)
        queryClient.invalidateQueries('anecdotes')
      }
    })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isLoading, isError, data, error } = useQuery(
    'anecdotes',
    getAnecdotes,
    { 
      retry: 1
    }
  )

  if ( isLoading ) {
    return <div>loading data...</div>
  }

  if ( isError  ) {
    return <div>error loading data: {error.message}</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
