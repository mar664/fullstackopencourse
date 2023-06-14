import { useState } from "react";
import blogService from "../services/blogs";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";

const BlogForm = ({ updateBlogs }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const dispatch = useNotificationDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        author: blogAuthor,
        title: blogTitle,
        url: blogUrl,
      });
      showSuccessMessage(
        dispatch,
        `a new blog ${blogTitle} by ${blogAuthor} added`
      );
      setBlogAuthor("");
      setBlogTitle("");
      setBlogUrl("");
      updateBlogs(newBlog);
    } catch (exception) {
      console.log(exception);
      showErrorMessage(dispatch, exception.response.data.error);
    }
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
