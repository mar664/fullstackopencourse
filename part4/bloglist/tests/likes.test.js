const listHelper = require('../utils/list_helper')
const { blogsSampleData } = require('./blogs.data')

describe('total likes', () => {
  const listWithOneBlog = blogsSampleData(1)

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  const listWithNoBlogs = []

  test('when list has no blogs', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  const listWith6Blogs = blogsSampleData(6)

  test('when list has 6 blogs with total of 36 likes', () => {
    const result = listHelper.totalLikes(listWith6Blogs)
    expect(result).toBe(36)
  })
})