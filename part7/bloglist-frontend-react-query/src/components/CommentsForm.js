import blogService from "../services/blogs";
import {
  showErrorMessage,
  showSuccessMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { useField } from "../hooks";
import { useMutation, useQueryClient } from "react-query";

const CommentsForm = ({ blog }) => {
  const comment = useField("text");
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newCommentMutation = useMutation(blogService.comment, {
    onSuccess: (updatedBlog) => {
      showSuccessMessage(dispatch, `comment added to '${updatedBlog.title}'`);
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

  const addComment = async (event) => {
    event.preventDefault();

    newCommentMutation.mutate({ id: blog.id, comment: comment.value });
  };

  return (
    <form onSubmit={addComment}>
      <input {...comment.spread} />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentsForm;
