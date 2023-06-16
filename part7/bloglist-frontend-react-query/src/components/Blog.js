const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <span className="blog-title">{blog.title}</span>{" "}
      <span className="blog-author">{blog.author}</span>
    </div>
  );
};

export default Blog;
