import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useSelector } from "react-redux";

const Blogs = ({
  user,
  handleLogout,
  showSuccessMessage,
  showErrorMessage,
  setBlogs,
}) => {
  const blogs = useSelector((state) => state.blogs);

  const incrementLikes = async (blog) => {
    try {
      await blogService.update(blog.id, {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
      });
      showSuccessMessage(`${blog.title} likes incremented`);
      setBlogs(
        blogs.map((b) => {
          if (blog.id === b.id) {
            b.likes++;
          }
          return b;
        })
      );
    } catch (exception) {
      console.log(exception);
      showErrorMessage(exception.response.data.error);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        console.log(blog.id);
        await blogService.remove(blog.id);
        showSuccessMessage(`${blog.title} removed`);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        console.log(exception);
        showErrorMessage(exception.response.data.error);
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
        <BlogForm
          showSuccessMessage={showSuccessMessage}
          showErrorMessage={showErrorMessage}
          updateBlogs={(blog) => {
            blog.user = user;
            setBlogs(blogs.concat(blog));
          }}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userId={user.id}
          onClickRemove={handleDelete}
          onClickLikes={incrementLikes}
        />
      ))}
    </div>
  );
};

export default Blogs;
