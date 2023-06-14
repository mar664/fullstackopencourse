import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import { useQuery } from "react-query";
import { useUserDispatch, useUserValue } from "./contexts/userContext";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import {
  // ...
  useMatch,
} from "react-router-dom";
import BlogInfo from "./components/BlogInfo";
import Menu from "./components/Menu";

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");

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
    matchUser && blogs
      ? blogs.filter((blog) => blog.user.id === matchUser.params.id)
      : null;

  const blog =
    matchBlog && blogs
      ? blogs.find((blog) => blog.id === matchBlog.params.id)
      : null;

  return (
    <div>
      {user === null ? (
        <h1>Login</h1>
      ) : (
        <>
          <Menu />
          <h1>Blogs</h1>
        </>
      )}
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Routes>
            <Route path="/users/:id" element={<User blogs={userBlogs} />} />
            <Route path="/users" element={<Users blogs={blogs} />} />
            <Route path="/blogs/:id" element={<BlogInfo blog={blog} />} />
            <Route path="/" element={<Blogs blogs={blogs} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
