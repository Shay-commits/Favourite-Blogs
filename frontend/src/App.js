import React, { useEffect, useRef } from 'react'
import { Switch, useHistory, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/blogform'
import blogService from './services/blogs'
import Toggable from './components/toggable'
import LoginForm from './components/Login'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import SignupForm from './components/Signup'
import LoginHeader from './components/loginheaderlink'
import HomePage from './components/Home'


const App = () => {
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogState = useSelector(state => state.blog)
  const notification = useSelector(state => state.notify)
  const user = useSelector(state => state.user)



  
 
  //logout handler
  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
  

  
  
  return (
    <div>
      <div class="bodycont1">
        <h3 class="headerlogo"> BlogList</h3>
        <Link class="headerlink" to="/"> Home </Link>
        <Link class="headerlink" to="/newblog"> New Blog </Link>
        <Link class="headerlink" to="/blogs"> Blogs </Link>
        <LoginHeader/>
      </div>

      <Switch>
       <Route path="/newblog">
          <div>
            {user === null?
            <div>
              <LoginForm />
            </div> :
             <BlogForm/>}
          </div> 
        </Route>
        <Route path="/register">
          <div>
            {user === null?
              <div> 
                <SignupForm />  
              </div> :
              <div>
              <p> {user.name} logged-in <button onClick={logoutHandler}> logout </button></p>
              </div>
              }
            </div>
        </Route>

        <Route path="/login">
          <div>
            {user === null?
              <div> 
                <LoginForm />  
              </div> :
              <div>
              <p> {user.name} logged-in <button onClick={logoutHandler}> logout </button></p>
              </div>
              }
            </div>
        </Route>
        

        <Route path="/blogs">
          <h3> {notification} </h3>
          <div>
            {user === null?
            <div>
              <div class='loginform'>
                <LoginForm />
              </div>
              
            </div> 
            :
            <div class='bloglistcont'>
                {blogState.sort((a,b) => b.likes - a.likes).map(blog =>
                  <Blog key={blog.id} blog={blog} />
                )}
            </div>}
          </div>
        </Route>


        <Route path="/">
          <HomePage/>


        </Route>

      
      </Switch>
  </div>
 )
}

export default App