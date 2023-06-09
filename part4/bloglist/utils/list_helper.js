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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}