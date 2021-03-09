const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)



test('sends the right amount of blog posts', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(1)

})

test('recieves list of blog posts in json format', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)


})

test('verify unique property identifier is named id', async () => {
   const result = await api.get('/api/blogs')
   expect(result).toBeDefined()

}
)

test('make a new blog post', async () => {
    const result = new Blog({
        title: 'why women deserve less',
        author: 'men',
        url: 'www.idontbelievetheydeserveless.com',
        likes: 5000
    }) 

    await api.post('/api/blogs')
      .send(result)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const getBlogs = await Blog.find({})
    const getList = getBlogs.map(r => r.toJSON())

    expect(getList).toHaveLength(5)



})

test('that blog post without likes returns 0', async () => {

    const result = new Blog({
        title: 'why men deserve less',
        author: 'women',
        url: 'www.idontbelievetheydeserveless.com'
        

    })

    await api
      .post('/api/blogs')
      .send(result)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const getBlogs = await Blog.find({title: 'why men deserve less'})
    
    const getList = getBlogs[0].likes
    


    expect(getList).toBe(0)



})

test('no title or url are missing then 400 request is sent', async () => {

    const result = new Blog({
        author: 'women'
    })

    await api
      .post('/api/blogs')
      .send(result)
      .expect(400)

})


afterAll(() => {
    mongoose.connection.close()
})