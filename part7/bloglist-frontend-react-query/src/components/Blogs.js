import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({ blogs, user, handleLogout }) => {
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
        <Blog key={blog.id} blog={blog} userId={user.id} />
      ))}
    </div>
  );
};

export default Blogs;
