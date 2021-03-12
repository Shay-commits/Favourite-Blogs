import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = React.forwardRef((props, ref) => {

  const [visibility,setVisibility] = useState(false)
  const showWhenVisible = { display: visibility? '': 'none' }
  const hideWhenVisible = { display: visibility? 'none' : '' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  Toggable.displayName = 'Toggable'

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}> {props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}> cancel </button>
      </div>
    </div>
  )
})

export default Toggable
