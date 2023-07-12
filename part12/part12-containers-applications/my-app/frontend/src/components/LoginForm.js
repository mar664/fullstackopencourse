import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  showErrorMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useUserDispatch } from "../contexts/userContext";
import { useField } from "../hooks";
import { Button, TextField } from "@mui/material";

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
        <TextField {...username.spread} name="Username" />
      </div>
      <div>
        <TextField {...password.spread} name="Password" />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
