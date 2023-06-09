const listHelper = require('../../utils/list_helper')
const { blogsSampleData } = require('../data/blogs')

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

describe('favorite blog', () => {
  const listWithOneBlog = blogsSampleData(1)

  test('when list has only one blog, equals the only blog of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  const listWithNoBlogs = []

  test('when list has no blogs', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    expect(result).toEqual(undefined)
  })

  const listWith6Blogs = blogsSampleData(6)

  test('when list has 6 blogs, should be 3rd element', () => {
    const result = listHelper.favoriteBlog(listWith6Blogs)
    expect(result).toEqual(listWith6Blogs[2])
  })
})