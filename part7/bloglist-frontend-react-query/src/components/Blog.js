import {
  // ...
  Link,
} from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}><span className="blog-title">{blog.title}</span>{" "}
      <span className="blog-author">{blog.author}</span>
      </Link>
    </div>
  );
};

export default Blog;
