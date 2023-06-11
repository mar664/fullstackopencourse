import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const Blogs = ({ blogs, user, handleLogout, showSuccessMessage, showErrorMessage, setBlogs }) => {
  return (
    <div>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonLabel='create blog'>
      <BlogForm showSuccessMessage={showSuccessMessage} showErrorMessage={showErrorMessage} updateBlogs={(blog) => {
          blog.user = user
          setBlogs(blogs.concat(blog))
        }
        }/>
        </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs