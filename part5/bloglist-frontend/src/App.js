import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
  }

  
  const showErrorMessage = (message) => {
    setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem(
      'loggedBlogAppUser'
    )
  }
  
  useEffect(() => {
    if(user !== null){
      blogService.getAll().then(blogs =>
          setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage}/>
      { user === null ? <LoginForm setUser={setUser} showErrorMessage={showErrorMessage}/>
        : <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />}
    </div>
  )
}

export default App