import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let blog
    let onClickLikesMockHandler
    let onClickRemoveMockHandler

    beforeEach(() => {
    const userId = '%fdfdfdsfsdfsdfsdf'
    blog = {
        author: 'name',
        title: 'blog title',
        url: 'http://myurl.com',
        likes: 10,
        user: {
        name: 'Me',
        id: userId
        }
    }

    onClickLikesMockHandler = jest.fn()
    onClickRemoveMockHandler = jest.fn()

    container = render(<Blog blog={blog} userId={userId} onClickLikes={onClickLikesMockHandler} onClickRemove={onClickRemoveMockHandler} />).container

    })

    test('renders title and author and not url and likes', () => {
    const blogTitleContainer = container.querySelector('.blog-title')
    expect(blogTitleContainer).toHaveTextContent(
        blog.title
    )
    const blogAuthorContainer = container.querySelector('.blog-author')
    expect(blogAuthorContainer).toHaveTextContent(
        blog.author
    )

    const blogAdditionalContainer = container.querySelector('.blog-additional-content')
    expect(blogAdditionalContainer).toHaveStyle('display: none')
    })
})