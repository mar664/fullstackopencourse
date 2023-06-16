import { forwardRef } from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Link = forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink = ({ primary, to }) => {
  return (
    <li>
      <Paper
        elevation={3}
        sx={{
          margin: 1,
        }}
      >
        <ListItemButton component={Link} to={to}>
          <ListItemText primary={primary} />
        </ListItemButton>
      </Paper>
    </li>
  );
};

const Blogs = ({ blogs }) => {
  // Sort by likes descending
  blogs.sort((a, b) => a.likes - b.likes);
  blogs.reverse();
  return (
    <div>
      <Togglable buttonLabel="create blog">
        <BlogForm />
      </Togglable>
      <List>
        {blogs.map((blog) => (
          <ListItemLink
            key={blog.id}
            to={`/blogs/${blog.id}`}
            primary={blog.title}
          />
        ))}
      </List>
    </div>
  );
};

export default Blogs;
