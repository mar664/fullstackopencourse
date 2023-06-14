import { useMutation, useQueryClient } from "react-query";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import blogService from "../services/blogs";
import { useUserValue } from "../contexts/userContext";
import CommentsForm from "./CommentsForm";
import {
  // ...
  useNavigate,
} from "react-router-dom";

const BlogInfo = ({ blog }) => {
  if (!blog) return;
  const user = useUserValue();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      showSuccessMessage(dispatch, `blog ${updatedBlog.title} has been liked`);
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData(
        "blogs",
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
    },
    onError: (error, _variables, _context) => {
      console.log(error);
      showErrorMessage(dispatch, error.response.data.error);
    },
  });

  const deleteBlogMutation = useMutation(blogService.remove);

  const dispatch = useNotificationDispatch();

  const incrementLikes = (blog) => {
    updateBlogMutation.mutate({
      id: blog.id,
      postData: {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
      },
    });
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          showSuccessMessage(dispatch, `blog ${blog.title} has been removed`);
          navigate("/");
          const blogs = queryClient.getQueryData("blogs");
          queryClient.setQueryData(
            "blogs",
            blogs.filter((b) => b.id !== blog.id)
          );
        },
        onError: (error, _variables, _context) => {
          console.log(error);
          showErrorMessage(dispatch, error.response.data.error);
        },
      });
    }
  };

  return (
    <div className="blog-info">
      <h2>
        <span className="blog-title">{blog.title}</span>{" "}
        <span className="blog-author">{blog.author}</span>
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span className="likes">{blog.likes}</span> likes
      <button className="like-button" onClick={() => incrementLikes(blog)}>
        like
      </button>
      <br />
      added by {blog.user.name}
      <br />
      {blog.user.id === user.id ? (
        <button className="remove-blog" onClick={() => deleteBlog(blog)}>
          remove
        </button>
      ) : (
        ""
      )}
      <div>
        <h3>comments</h3>
        <CommentsForm blog={blog} />
        <ul>
          {blog.comments.map((c) => (
            <li key={Math.floor(Math.random() * 100000)}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogInfo;
