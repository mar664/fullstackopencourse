import { useUserValue } from "../contexts/userContext";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({ blogs, handleLogout }) => {
  const user = useUserValue();

  // Sort by likes descending
  blogs.sort((a, b) => a.likes - b.likes);
  blogs.reverse();
  return (
    <div>
      <p>
        {user.name} logged in{" "}
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      <Togglable buttonLabel="create blog">
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
