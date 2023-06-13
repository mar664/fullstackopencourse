import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import Blogs from "./components/Blogs";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSuccessNotification,
  showSuccessNotification,
} from "./reducers/successNotificationReducer";
import {
  hideErrorNotification,
  showErrorNotification,
} from "./reducers/errorNotificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { clearUser, setUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const showSuccessMessage = (message) => {
    dispatch(showSuccessNotification(message));
    setTimeout(() => {
      dispatch(hideSuccessNotification());
    }, 5000);
  };

  const showErrorMessage = (message) => {
    dispatch(showErrorNotification(message));
    setTimeout(() => {
      dispatch(hideErrorNotification());
    }, 5000);
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogappUser");
  };

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const jsonUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(jsonUser));
      blogService.setToken(jsonUser.token);
    }
  }, []);

  return (
    <div>
      {user === null ? <h1>Login</h1> : <h1>Blogs</h1>}
      <ErrorNotification />
      <SuccessNotification />
      {user === null ? (
        <LoginForm showErrorMessage={showErrorMessage} />
      ) : (
        <Blogs
          handleLogout={handleLogout}
          showSuccessMessage={showSuccessMessage}
          showErrorMessage={showErrorMessage}
        />
      )}
    </div>
  );
};

export default App;
