import { useState } from "react";
import { useSelector } from "react-redux";

const Blog = ({ blog, onClickLikes, onClickRemove }) => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
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
        <button className="like-button" onClick={() => onClickLikes(blog)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.id === user.id ? (
          <button className="remove-blog" onClick={() => onClickRemove(blog)}>
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
