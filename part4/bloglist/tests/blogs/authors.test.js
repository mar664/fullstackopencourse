const listHelper = require('../../utils/list_helper')
const { blogsSampleData } = require('../data/blogs')

describe('author with most blogs', () => {
  const listWithOneBlog = blogsSampleData(1)

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    console.log(result)
    expect(result).toEqual({ author: 'Michael Chan', blogs: 1 })
  })

  const listWithNoBlogs = []

  test('when list has no blogs', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    expect(result).toEqual(undefined)
  })

  const listWith6Blogs = blogsSampleData(6)

  test('when list has 6 blogs and Robert C. Martin has most with 3 blogs', () => {
    const result = listHelper.mostBlogs(listWith6Blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})