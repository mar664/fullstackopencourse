import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useSelector } from "react-redux";

const Blogs = ({ handleLogout }) => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  return (
    <div>
      <p>
        {user.name} logged in{" "}
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      <Togglable buttonLabel="create blog">
        <BlogForm />
      </Togglable>
      {[...blogs]
        .sort((a, b) => a.likes - b.likes)
        .reverse()
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default Blogs;
