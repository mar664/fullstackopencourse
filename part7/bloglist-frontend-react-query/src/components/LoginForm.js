import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  showErrorMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useUserDispatch } from "../contexts/userContext";
import { useField } from "../hooks";

const LoginForm = () => {
  const username = useField({ placeholder: "enter username" });
  const password = useField({ type: "password" });
  const userDispatch = useUserDispatch();
  const dispatch = useNotificationDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      userDispatch({ type: "SET_USER", payload: user });
      username.clear();
      password.clear();
    } catch (exception) {
      showErrorMessage(dispatch, "Wrong credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username.spread} name="Username" />
      </div>
      <div>
        password
        <input {...password.spread} name="Password" />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
