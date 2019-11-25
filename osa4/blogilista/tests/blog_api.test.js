const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('get blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there is 6 blogs', async () => {
        const res = await api
            .get('/api/blogs')
            .expect(200)
    
        expect(res.body.length).toBe(helper.initialBlogs.length)
    })
    test('id is defined as id, not _id', async () => {
        const res = await api
            .get('/api/blogs/5a422a851b54a676234d17f7')
            .expect(200)
        expect(res.body.id).toBeDefined();
    })    
})

describe('get blog with id', () => {
    test('get blog with specific id', async () => {
        const res = await api
            .get('/api/blogs/5a422a851b54a676234d17f7')
            .expect(200)
        expect(res.body.author).toBe(helper.initialBlogs[0].author);
    })
})

describe('add blogs', () => {
    test('blogs can be added with post', async () => {
        const userId = helper.initialUsers[0]._id;
        const newBlog = {
            title: "Who is the best ever? ",
            author: "Ida",
            url: "https://blogurl.com/",
            likes: 999999,
            user: userId
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsInDb = await helper.blogsInDb();
        const authors = blogsInDb.map(b => b.author)
        expect(authors).toContain('Ida')
        expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
    })
    
    test('if blog is added without likes, likes will be 0', async () => {
        const userId = helper.initialUsers[0]._id;
        const newBlog = {
            title: "Who is the best ever? ",
            author: "Ida",
            url: "https://blogurl.com/",
            user:  userId
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsInDb = await helper.blogsInDb();
        const likes = blogsInDb.map(b => b.likes)
        expect(likes).toContain(0)
    })
    
    test('blog cannot be added without title and url', async () => {
        const userId = helper.initialUsers[0]._id;
        const newBlog = {
            author: "Ida",
            likes: 999999,
            user:  userId
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const response = await helper.blogsInDb();
        expect(response.length).toBe(helper.initialBlogs.length)
    })
})

test('blogs can be updated', async () => {
    const blogIdToBeUpdated = helper.initialBlogs[0]._id;
    const newBlog = {
        title: "My cat is the best ever",
        author: "Ida",
        url: "https://myCatBlog.com/",
        likes: 999999,
    }
    await api
        .put('/api/blogs/' + blogIdToBeUpdated)
        .send(newBlog)
        .expect(200)
    const blogsInDb = await helper.blogsInDb();
    const titles = blogsInDb.map(b => b.title)
    expect(titles).toContain(newBlog.title)
})

describe('delete blog', () => {
    test('blogs can be deleted with id', async () => {
        const blogIdToBeDeleted = helper.initialBlogs[0]._id;
        await api
            .delete('/api/blogs/' + blogIdToBeDeleted)
            .expect(200)
        const blogsInDbLength = await helper.blogsInDb();
        expect(blogsInDbLength.length).toBe(helper.initialBlogs.length - 1)
    })
})


afterAll(() => {
    mongoose.connection.close()
})