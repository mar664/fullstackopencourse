import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  showErrorMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useUserDispatch } from "../contexts/userContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userDispatch = useUserDispatch();
  const dispatch = useNotificationDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      userDispatch({ type: "SET_USER", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      showErrorMessage(dispatch, "Wrong credentials");
    }
  };

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
  );
};

export default LoginForm;
