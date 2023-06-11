import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ showSuccessMessage, showErrorMessage, updateBlogs }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        author: blogAuthor, title: blogTitle, url: blogUrl
      })
      showSuccessMessage(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      updateBlogs(newBlog)
    } catch (exception) {
      console.log(exception)
      showErrorMessage(exception.response.data.error)
    }
  }

  return ( <form onSubmit={handleCreateBlog}>
      title:<input placeholder="enter title" type="text" value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)}/><br/>
      author:<input placeholder="enter author" type="text" value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)}/><br/>
      url:<input placeholder="enter url" type="text" value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)}/><br/>
    <input type="submit" value="create"/><br/>
  </form>
  )
}

export default BlogForm