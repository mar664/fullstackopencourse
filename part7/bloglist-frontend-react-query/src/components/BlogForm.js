import { useState } from "react";
import blogService from "../services/blogs";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useMutation, useQueryClient } from "react-query";

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      showSuccessMessage(
        dispatch,
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
    },
    onError: (error, _variables, _context) => {
      console.log(error);
      showErrorMessage(dispatch, error.response.data.error);
    },
  });

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    newBlogMutation.mutate({
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl,
    });
  };

  return (
    <form onSubmit={handleCreateBlog}>
      title:
      <input
        placeholder="enter title"
        type="text"
        value={blogTitle}
        onChange={({ target }) => setBlogTitle(target.value)}
      />
      <br />
      author:
      <input
        placeholder="enter author"
        type="text"
        value={blogAuthor}
        onChange={({ target }) => setBlogAuthor(target.value)}
      />
      <br />
      url:
      <input
        placeholder="enter url"
        type="text"
        value={blogUrl}
        onChange={({ target }) => setBlogUrl(target.value)}
      />
      <br />
      <input type="submit" value="create" />
      <br />
    </form>
  );
};

export default BlogForm;
