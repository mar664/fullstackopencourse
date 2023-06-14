import { useMutation, useQueryClient } from "react-query";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import blogService from "../services/blogs";
import { useUserValue } from "../contexts/userContext";

const BlogInfo = ({ blog }) => {
  const user = useUserValue();

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
    <div className="blog">
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
    </div>
  );
};

export default BlogInfo;
