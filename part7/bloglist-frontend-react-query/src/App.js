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

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

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
            <Route path="/users" element={<Users blogs={blogs} />} />
            <Route path="/" element={<Blogs blogs={blogs} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
