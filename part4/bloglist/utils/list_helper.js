const lodash = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, item) => acc + item.likes, 0)
}

// returns the blog with the most likes
const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return (blog.likes > acc.likes) ? blog : acc
  }, blogs[0])
}

// returns an object with author & blog count for author with most blogs
const mostBlogs = (blogs) => {
  // Get count of blogs of each author
  const authorBlogs = lodash.countBy(blogs, 'author')

  // Get author name who has the most blogs
  const authorWithMostBlogs = lodash.maxBy(Object.keys(authorBlogs), author => {
    return authorBlogs[author]
  })

  // Get count of blogs by author with max blogs
  const totalBlogsForAuthorWithMostBlogs = authorBlogs[authorWithMostBlogs]

  if(authorBlogs && totalBlogsForAuthorWithMostBlogs){
    return { author: authorWithMostBlogs, blogs: totalBlogsForAuthorWithMostBlogs }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}