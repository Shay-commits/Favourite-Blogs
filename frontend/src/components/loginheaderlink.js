import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/loginReducer';

const LoginHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // logout handler
  const logoutHandler = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
  };

  if (user) {
    return (
      <div className="headeruser">
        <p>
          {' '}
          Hello { }
           { user.name }
          {' '}
          <button onClick={logoutHandler}> logout </button>
        </p>
      </div>

    );
  }
  return (
    <div className="headeruser">
      <Link to="/register"> Register</Link>
      <Link to="/login"> Log In</Link>
    </div>

  );
};

export default LoginHeader;
