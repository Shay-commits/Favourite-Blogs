import React from 'react'
import { useDispatch } from 'react-redux'
import  { setUser } from '../reducers/loginReducer'
import { notificationChanger } from '../reducers/notificationReducer'
import  blogService  from '../services/blogs'
import loginService from '../services/login'
import { useHistory } from 'react-router-dom'



const LoginForm = () => {

  let history = useHistory()
  const dispatch = useDispatch()


  const loginHandler = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    const credentials = {
      username,
      password
    }

    try {
      const user = await loginService.login(credentials)
      // save user info in local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      history.push('/')
    }

    catch (exception) {
      dispatch(notificationChanger('invalid username or password'))
      setTimeout(() => {
        dispatch(notificationChanger(null))
      }, 5000)
    }
  }

  return (
    <div class="formcont">
      <div class="blogformheading">
        <h2> Login </h2>
        </div>
  <div class="blogform">
    <form onSubmit={loginHandler}>
      <div class="input">
       <p> username </p>
        <input type="text" name="username"  />
      </div>

      <div class="input">
        <p> password </p>
        <input type="password" name="password" />
      </div>

      <button type="submit"> login </button>

    </form>
  </div> 
  </div>
  
  ) }
export default LoginForm

