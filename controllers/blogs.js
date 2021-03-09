const jwt = require('jsonwebtoken');
const config = require('../utils/config')
const blogRouter = require('express').Router() 
const User = require('../models/user')
const Blog = require('../models/blog')




//Get resources 
blogRouter.get('/', async (req,res) => {
    const blogs = await Blog.find({}).populate('user')
    console.log(blogs)
      res.json(blogs)
  }
)

// Add resource
blogRouter.post('/', async (req,res) => {
  const verifytoken = await jwt.verify(req.token, config.SECRET)
  
  if (!(req.token || verifytoken)) {
        res.status(401).json({error: 'invalid or missing token'})
    }
  
  const user = await User.findById(verifytoken.id)
  
  const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user : user._id
    })

  const result = await blog.save()

  res.status(201).json(result)
})

// deleting resource
blogRouter.delete('/:id', async (req,res) => {
  const blog = await Blog.findById(req.params.id)
  const userid = blog.user
  const verifytoken = jwt.verify(req.token, process.env.SECRET)
  
  if (verifytoken.id.toString() === userid.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  else {
  res.status(401).json({error: "user is not authorised"})
  } 
}
)

//updating resource
blogRouter.put('/:id', async (req,res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
  res.json(newBlog)
})

module.exports = blogRouter