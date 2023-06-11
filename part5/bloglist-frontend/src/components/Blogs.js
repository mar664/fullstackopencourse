import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blogs = ({ blogs, user, handleLogout, showSuccessMessage, showErrorMessage, setBlogs }) => {
  const incrementLikes = async (blog) => {
    try {
      await blogService.update(blog.id, {
        author: blog.author, title: blog.title, url: blog.url, likes: blog.likes + 1
      })
      showSuccessMessage(`${blog.title} likes incremented`)
      setBlogs(blogs.map(b => {
        if(blog.id === b.id){
          b.likes++
        }
        return b
      }))
    } catch (exception) {
      console.log(exception)
      showErrorMessage(exception.response.data.error)
    }
  }

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
        <Blog key={blog.id} blog={blog} onClickLikes={incrementLikes} />
      )}
    </div>
  )
}

export default Blogs