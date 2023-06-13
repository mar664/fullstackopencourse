import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import Blogs from "./components/Blogs";
import { useDispatch } from "react-redux";
import {
  hideSuccessNotification,
  showSuccessNotification,
} from "./reducers/successNotificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const showSuccessMessage = (message) => {
    dispatch(showSuccessNotification(message));
    setTimeout(() => {
      dispatch(hideSuccessNotification());
    }, 5000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {user === null ? <h1>Login</h1> : <h1>Blogs</h1>}
      <ErrorNotification message={errorMessage} />
      <SuccessNotification />
      {user === null ? (
        <LoginForm setUser={setUser} showErrorMessage={showErrorMessage} />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          showSuccessMessage={showSuccessMessage}
          showErrorMessage={showErrorMessage}
          setBlogs={setBlogs}
        />
      )}
    </div>
  );
};

export default App;
