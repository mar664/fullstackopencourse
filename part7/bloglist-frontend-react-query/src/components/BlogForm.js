import blogService from "../services/blogs";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useMutation, useQueryClient } from "react-query";
import { useField } from "../hooks";

const BlogForm = () => {
  const title = useField({ placeholder: "enter title" });
  const author = useField({ placeholder: "enter author" });
  const url = useField({ placeholder: "enter url" });
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
      author: author.value,
      title: title.value,
      url: url.value,
    });
  };

  return (
    <form onSubmit={handleCreateBlog}>
      title:
      <input {...title.spread} />
      <br />
      author:
      <input {...author.spread} />
      <br />
      url:
      <input {...url.spread} />
      <br />
      <input type="submit" value="create" />
      <br />
    </form>
  );
};

export default BlogForm;
