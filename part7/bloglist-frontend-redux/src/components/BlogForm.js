import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { showSuccessNotification } from "../reducers/successNotificationReducer";
import { showErrorNotification } from "../reducers/errorNotificationReducer";
import { useField } from "../hooks";

const BlogForm = () => {
  const title = useField({ placeholder: "enter title" });
  const author = useField({ placeholder: "enter author" });
  const url = useField({ placeholder: "enter url" });
  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        author: author.value,
        title: title.value,
        url: url.value,
      });
      dispatch(
        showSuccessNotification(
          `a new blog ${title.value} by ${author.value} added`
        )
      );
      title.clear();
      author.clear();
      url.clear();
      dispatch(createBlog(newBlog));
    } catch (exception) {
      console.log(exception);
      dispatch(showErrorNotification(exception.response.data.error));
    }
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
