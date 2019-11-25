const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach(element => {
    likes += element.likes
  });
  return likes;
}

const favouriteBlog = (blogs) => {
  let fav = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
  delete fav['_id']
  delete fav['__v']
  delete fav['url']
  return fav
}

const mostBlogs = (blogs) => {
  const authorArray = _.map(blogs, 'author')
  const mostBlogsBy = _.chain(authorArray).countBy().toPairsIn().max(_.last).head().value();
  const count = _.filter(blogs, ['author', mostBlogsBy]).length;
  return ({ author: mostBlogsBy, blogs: count })
}



const mostLikes = (blogs) => {
  let del = []
  blogs.forEach(element => {
    del.push(_.omit(element, ['_id','title','url','__v' ]))
  });
  const array = _.chain(del).groupBy('author').mapValues().values().value();
  let barr = []
  let author;
  array.forEach(el =>{
    let sum = 0;
    el.forEach(el =>{
      sum += el.likes
      author = el.author;
    })
    barr.push({author: author, likes: sum});
  })
  const maxLikes = _.maxBy(barr, 'likes')
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}