import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import { useQuery } from "react-query";
import { useUserDispatch, useUserValue } from "./contexts/userContext";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";
import User from "./components/User";
import {
  // ...
  useMatch,
} from "react-router-dom";

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  const match = useMatch("/users/:id");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: loggedUser });
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const result = useQuery("blogs", blogService.getAll, { enabled: !!user });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  const userBlogs =
    match && blogs
      ? blogs.filter((blog) => blog.user.id === match.params.id)
      : null;

  return (
    <div>
      {user === null ? <h1>Login</h1> : <h1>Blogs</h1>}
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <UserInfo />
          <Routes>
            <Route path="/users/:id" element={<User blogs={userBlogs} />} />
            <Route path="/users" element={<Users blogs={blogs} />} />
            <Route path="/" element={<Blogs blogs={blogs} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
