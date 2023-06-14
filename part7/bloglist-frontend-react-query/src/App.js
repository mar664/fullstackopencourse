import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import { useQuery } from "react-query";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const result = useQuery("blogs", blogService.getAll, { enabled: !!user });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  return (
    <div>
      {user === null ? <h1>Login</h1> : <h1>Blogs</h1>}
      <Notification />
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
