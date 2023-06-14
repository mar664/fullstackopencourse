import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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
      <Notification />
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          setBlogs={setBlogs}
        />
      )}
    </div>
  );
};

export default App;
