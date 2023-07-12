import blogService from "../services/blogs";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useMutation, useQueryClient } from "react-query";
import { useField } from "../hooks";
import { Button, TextField } from "@mui/material";

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
      title.clear();
      author.clear();
      url.clear();
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
      <TextField variant="standard" label="Title" {...title.spread} />
      <br />
      <TextField variant="standard" label="Author" {...author.spread} />
      <br />
      <TextField variant="standard" label="URL" {...url.spread} />
      <br />
      <br />
      <Button variant="contained" type="submit">
        create
      </Button>
      <br />
    </form>
  );
};

export default BlogForm;
