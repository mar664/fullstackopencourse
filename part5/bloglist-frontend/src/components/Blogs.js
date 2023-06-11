import Blog from "./Blog"
import BlogForm from "./BlogForm"

const Blogs = ({ blogs, user, handleLogout, showSuccessMessage, showErrorMessage, setBlogs }) => {
  return (
    <div>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <BlogForm showSuccessMessage={showSuccessMessage} showErrorMessage={showErrorMessage} updateBlogs={(blog) => {
          blog.user = user
          setBlogs(blogs.concat(blog))
        }
        }/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs