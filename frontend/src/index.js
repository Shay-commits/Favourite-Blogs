import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider } from 'react-redux'
import blogReducer from './reducers/blogReducer'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'



const reducer = combineReducers({
    blog: blogReducer,
    notify: notificationReducer,
    user : loginReducer

})

const store = createStore(
  reducer, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)




ReactDOM.render(
    <Router>
    <Provider store={store}> 
      
        <App />
      

    </Provider>
    </Router>, document.getElementById('root'))