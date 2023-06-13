import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";

const Blogs = ({ handleLogout, showSuccessMessage, showErrorMessage }) => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const incrementLikes = async (blog) => {
    try {
      const newBlog = await blogService.update(blog.id, {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
      });
      showSuccessMessage(`${blog.title} likes incremented`);
      dispatch(updateBlog(newBlog));
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
        dispatch(deleteBlog(blog.id));
      } catch (exception) {
        console.log(exception);
        showErrorMessage(exception.response.data.error);
      }
    }
  };

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
        />
      </Togglable>
      {[...blogs]
        .sort((a, b) => a.likes - b.likes)
        .reverse()
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onClickRemove={handleDelete}
            onClickLikes={incrementLikes}
          />
        ))}
    </div>
  );
};

export default Blogs;
