import React from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import  { createBlogs } from '../reducers/blogReducer'
import { notificationChanger } from '../reducers/notificationReducer'

const BlogForm = () => {

  const dispatch = useDispatch()

  const addBlog =  async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url =  event.target.url.value
    event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''

    const newBlog = {
      title,
      author,
      url

    }


    try {
      
      const blog = await blogService.create(newBlog)
      dispatch(createBlogs(blog))
      dispatch(notificationChanger(`${title} by ${author} added`))
      setTimeout(() => {
        dispatch(notificationChanger(null))
      },5000)
    }

    catch(exception) {

      console.log('There was an error')

    }

  }

 
  

  return (

    <div class="formcont">
      <div class="blogformheading">
        <h2> Add a new blog  </h2>
      </div>
      <div class="blogform">
        <form onSubmit={addBlog}>
          <div class="input">
            <p> Title </p>
            <input type="text" name="title" />
          </div>
          <div class="input"> 
           <p> Author </p>
           <input type="text" name="author"/>
          </div>  
          <div class="input">
            <p> Url </p>
            <input type="text" name="url"/> 
          </div> 
          <button class="blogbutton" typep="submit"> create </button> 
        </form>
      </div>
   </div>
  )
}


export default BlogForm