import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";

const Blogs = ({ blogs, user, handleLogout, setBlogs }) => {
  const dispatch = useNotificationDispatch();
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        console.log(blog.id);
        await blogService.remove(blog.id);
        showSuccessMessage(dispatch, `${blog.title} removed`);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        console.log(exception);
        showErrorMessage(dispatch, exception.response.data.error);
      }
    }
  };

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
        <Blog
          key={blog.id}
          blog={blog}
          userId={user.id}
          onClickRemove={handleDelete}
        />
      ))}
    </div>
  );
};

export default Blogs;
