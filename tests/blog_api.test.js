const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const helper = require('./test_helper.js')

const Blog = require('../models/blog.js')
const test_helper = require('./test_helper.js')


let token = '';

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.listWithManyBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    
    await Promise.all(promiseArray)



    const response = await api.post('/api/login/').send({
        username: 'root',
        name: 'admin',
        password: 'secret'
      });
    
      token = response.body.token;


})


describe('addding new blog', () => {
    test('a valid blog will be added', async () => {

        const newBlog = {
            title: 'How to be a fullstack master',
            author: 'James Price',
            url: 'https://github.com/atkinsio/full-stack-open-2020',
            likes: 10,
          };

        await api
          .post('/api/blogs/')
          .set('Authorization', `bearer ${token}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsatEnd = await helper.blogsInDb
        
        expect(blogsatEnd).toHaveLength(helper.listWithManyBlogs.length+ 1)
    })
})



afterAll(() => {
    mongoose.connection.close();
  });