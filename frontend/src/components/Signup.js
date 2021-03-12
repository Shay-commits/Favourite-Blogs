import React from 'react'
import { useHistory } from 'react-router-dom'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import  { setUser } from '../reducers/loginReducer'
import { notificationChanger } from '../reducers/notificationReducer'
import  blogService  from '../services/blogs'

const SignupForm = () => {

  let history = useHistory()

   const dispatch = useDispatch()


  const signupHandler = async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.name.value = ''
    event.target.username.value = ''
     event.target.password.value = ''


     const credentials = {
       name,
       username,
       password
     }
    


    try {
      const user = await userService.create(credentials)
      // save user info in local storage 
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
        )
      blogService.setToken(user.token)
      dispatch(setUser(user)) 
      history.push('/')
    }

    catch (exception) {
      dispatch(notificationChanger('username already exists'))
      setTimeout(() => {
        dispatch(notificationChanger(null))
      }, 5000)
    }

    }

  return (
    <div class="formcont">
      <div class="blogformheading">
        <h2> Register </h2>
        </div>
  <div class="blogform"> 
    <form onSubmit={signupHandler}>
      <div class="input">
         <p> name </p>
        <input type="text" name="name" />
      </div>
      <div class="input">
       <p> username </p>
        <input type="text" name="username" />
      </div>
      <div class="input">
        <p> password</p>
        <input type="password" name="password" />
      </div>
      <button type="submit"> sign Up </button>
    </form>
    </div>
    </div>
    
  ) 
}

export default SignupForm

