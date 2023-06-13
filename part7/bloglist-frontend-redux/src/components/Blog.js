import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { showSuccessNotification } from "../reducers/successNotificationReducer";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";
import { showErrorNotification } from "../reducers/errorNotificationReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const incrementLikes = async (blog) => {
    try {
      const newBlog = await blogService.update(blog.id, {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
      });
      dispatch(showSuccessNotification(`${blog.title} likes incremented`));
      dispatch(updateBlog(newBlog));
    } catch (exception) {
      console.log(exception);
      dispatch(showErrorNotification(exception.response.data.error));
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        console.log(blog.id);
        await blogService.remove(blog.id);
        dispatch(showSuccessNotification(`${blog.title} removed`));
        dispatch(deleteBlog(blog.id));
      } catch (exception) {
        console.log(exception);
        dispatch(showErrorNotification(exception.response.data.error));
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <span className="blog-title">{blog.title}</span>{" "}
      <span className="blog-author">{blog.author}</span>
      <button className="toggleBlogInfo" onClick={toggleVisibility}>
        {visible ? "hide" : "show"}
      </button>
      <br />
      <div style={showWhenVisible} className="blog-additional-content">
        {blog.url}
        <br />
        likes <span className="likes">{blog.likes}</span>
        <button className="like-button" onClick={() => incrementLikes(blog)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.id === user.id ? (
          <button className="remove-blog" onClick={() => removeBlog(blog)}>
            remove
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
