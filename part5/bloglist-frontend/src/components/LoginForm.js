import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({showErrorMessage}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
    
        try {
          const user = await loginService.login({
            username, password,
          })
          blogService.setToken(user.token)

          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          ) 
          setUsername('')
          setPassword('')
        } catch (exception) {
            showErrorMessage('Wrong credentials')
        }
      }

return (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)
}

export default LoginForm