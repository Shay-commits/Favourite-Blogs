import blogService from '../services/blogs'


const blogReducer = (state=[], action) => {

  switch (action.type) {
  case 'INIT_BLOG':
    return action.data

  case 'NEW_BLOG':
    return state.concat(action.data)

  case 'LIKE': {
    const id = action.data.id
    const blog = state.find(x => x.id == id)
    const changedBlog = { ...blog, likes : blog.likes+1 }
    const newState = state.map( x => x.id !== id? x : changedBlog)

    return newState }

case 'DELETE': {
     const id = action.data.id 
     const newState = state.filter(x => x.id !== id)
     return newState
}
  default:
    return state
  }

}

export const initializeBlogs = () => {
    return async (dispatch) => {
      const data =  await blogService.getAll()

      dispatch({type: 'INIT_BLOG',
      data})
    }
}

export const createBlogs = (data) => {
  return {
    type: 'NEW_BLOG',
    data
  }
}

export const updateBlogs = (data) => {
  return {
    type: 'LIKE',
    data }
}

export const removeBlogs = (data) => {
    return {
        type: 'DELETE',
        data
    }
}

export default blogReducer