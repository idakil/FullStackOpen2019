const blogRouter = require('express').Router();
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(allBlogs.map(b => b.toJSON()))
})

blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        blog.likes === undefined ? 0 : request.body.likes
        blog.user = user._id;
        if (!blog.url || !blog.title) {
            response.status(400).end();
        } else {
            try {
                const savedBlog = await blog.save()
                user.blogs = user.blogs.concat(savedBlog._id)
                await user.save();
                response.status(201).json(savedBlog.toJSON())
            } catch (exception) {
                next(exception)
            }
        }
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        const decodedToken = jwt.verify(req.token, process.env.SECRET, (err, decodedToken) => {
            if(err) res.status(401).end()
        })
        if(decodedToken){
            const user = await User.findById(decodedToken.id)
            if (blog.user.toString() === user._id.toString()) {
                await Blog.deleteOne({ _id: blog._id })
                res.json(blog)
            }
        }
    } catch (exception) {
        next(exception)
    }

})

blogRouter.put('/:id', async (req, res) => {
    const updated = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, updated)
    res.json(blog)
})

module.exports = blogRouter