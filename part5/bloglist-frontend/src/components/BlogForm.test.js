import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

describe('<BlogForm/>', () => {
    let container
    let blog
    let updateBlogsMock
    let userId = "$rdfnjfknsdnkjfnd34452i3hu4r"
    let blogId = "$fgdgdfgfgdfgdfter"

beforeEach(() => {
    blog = {
      author: 'name',
      title: 'blog title',
      url: 'http://myurl.com'
    }

    blogService.create = (blogData) => { 
        return { ...blogData, user: userId, id: blogId }
    } 

    const showSuccessMessage = () => { }
    const showErrorMessage = () => {}
    updateBlogsMock = jest.fn((blog) => {  })

    container = render(<BlogForm showSuccessMessage={showSuccessMessage} showErrorMessage={showErrorMessage} updateBlogs={updateBlogsMock} />).container
})
  
  test('after adding to form input, click create check handler called properly', async () => {
    const user = userEvent.setup()
    const blogTitleTextBox = screen.getByPlaceholderText('enter title')
    await user.type(blogTitleTextBox, blog.title)
  
    const blogAuthorTextBox = screen.getByPlaceholderText('enter author')
    await user.type(blogAuthorTextBox, blog.author)
  
    const blogUrlTextBox = screen.getByPlaceholderText('enter url')
    await user.type(blogUrlTextBox, blog.url)
  
    const createButton = screen.getByText('create')
    await user.click(createButton)

    // Check that updateBlogs is called with correct data  
    expect(updateBlogsMock.mock.calls).toHaveLength(1)
    expect(updateBlogsMock.mock.calls[0][0]).toEqual({ ...blog, user: userId, id: blogId})
  })
})