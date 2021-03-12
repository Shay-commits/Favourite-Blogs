



const notificationReducer = (state='', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }


}

export const notificationChanger = (data) => {
  return {
    type : 'SET_NOTIFICATION',
    data
  }
}



export default notificationReducer