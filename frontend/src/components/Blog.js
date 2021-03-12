import React, { useState } from 'react'
import blogService from '../services/blogs.js'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlogs, updateBlogs } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,paddingLeft: 2,border: 'solid',borderWidth: 1
  }

  const dispatch = useDispatch()
  const state = useSelector(state => state.blog)
  const [visibility,setVisibility] = useState(false)
  const showWhenVisibility = { display: visibility? '': 'none' }
  const hideWhenVisibility = { display: visibility? 'none': '' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }
  // Increase and Update Blog likes
  const increaseLikes = async (id,blog) => {
    const changeBlog = state.find(n => n.id === id )
    const changedBlog = { ...changeBlog, likes: changeBlog.likes + 1}
    const updatedBlog =  await blogService.update(id, changedBlog)
    
    dispatch(updateBlogs(updatedBlog))
  }
  // Delete Blog Post
  const deleteBlog = (id,blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(id)
      dispatch(removeBlogs(blog))
    }
  }

  // Visibility of Delete Blog Post button 
  let removeButton = { display: 'none' }
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  
  if (loggedUserJSON) {
    const user =  JSON.parse(loggedUserJSON);
    const username = blog.user? blog.user.username : blog;
    removeButton = { display: user.username == username? '': 'none' }

  console.log(blog.user)
  console.log(`This is logged user ${user.username}`) }
  
  return  (
    <div style={blogStyle} className='newtest'>
      <div style={hideWhenVisibility} className='blogtest'>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}> view </button>
      </div>
      <div style={showWhenVisibility} className='hiddennewtest'>
         <p><span class="listhead">Title : </span> {blog.title} by {blog.author} <button onClick={toggleVisibility}> hide </button> </p>
         <p>  <span class="listhead">Link : </span> {blog.url} </p>
         <p> <span class="listhead"> Likes:</span> {blog.likes} <button onClick={() => increaseLikes(blog.id, blog)}> like </button> </p>
        <p> <button style={removeButton} onClick={() => deleteBlog(blog.id,blog)}> remove </button></p>

      </div>
    </div>
  ) 
}

export default Blog
