import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"
import slickicon from "../../images/slickicon.png"
import AboutLinks from '../AboutLinks';

const LoginForm = () => {

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser1 = async (e) => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'));
  }

  const demoUser2 = async (e) => {
    e.preventDefault()
    await dispatch(login('Tony@ironman.io', 'password'));
  }

  const demoUser3 = async (e) => {
    e.preventDefault()
    await dispatch(login('bill@microsoft.com', 'password'));
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <div className='container-login-page'>
      <header className='container-login-header'>
        <div className='header-left-col'></div>
        <NavLink exact to="/" className='header-center-col'></NavLink>
        <div className='header-right-col'>
          <div className='link-to-other-form'>
            New to Slick?
          </div>
          <div>
            <NavLink to="/sign-up">Create an account</NavLink>
          </div>
        </div>
      </header>
      <div className='text-sign-in'>
        <h1>Sign in to <span className='text-sign-in-slick'>Slick</span></h1>
        <p className='text-sign-in-suggest'>Welcome back to Slick</p>
        <img
        className='slick-logo3'
        alt=''
        src={slickicon} />
      </div>
      <form onSubmit={onLogin} className='form-container'>
        <div className='container-demo-users'>
          <div>
            <button
              className='demo-login-btn demo-user-1'
              type='submit'
              onClick={demoUser1}
            >Demo User</button>
          </div>
          {/* <div>
            <button
              className='demo-login-btn demo-user-2'
              type='submit'
              onClick={demoUser2}
            >Demo User 2</button>
          </div>
          <div>
            <button
              className='demo-login-btn demo-user-3'
              type='submit'
              onClick={demoUser3}
            >Demo User 3</button>
          </div> */}
        </div>
        <div className='container-content-rule'>
          <hr className='horizontal-line line-left'></hr>
          <div className='content-rule-center'> OR </div>
          <hr className='horizontal-line line-right'></hr>
        </div>
        {errors[0] &&
        <div className='error__container'>
          {errors.map((error, ind) => (
            <div key={ind} className='error__text'>{error}</div>
          ))}
        </div>
        }
        <div>
          {/* <label htmlFor='email'><span className='input-login-text'>Email</span></label> */}
          <div className='input'>
            <input
              className='login-input-field'
              name='email'
              type='text'
              required
              placeholder='name@work-email.com'
              value={email}
              onChange={updateEmail}
            />
          </div>
        </div>
        <div>
          {/* <label htmlFor='password'><span className='input-login-text'>Password</span></label> */}
          <div className='input'>
            <input
              className='login-input-field'
              name='password'
              type='password'
              required
              placeholder='Your password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type='submit' className='login-btn'>Login</button>
          </div>
        </div>
      <AboutLinks />
      </form>
    </div>
  );
};

export default LoginForm;
