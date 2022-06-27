import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"

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
    setEmail('demo@aa.io');
    setPassword('password')
    await dispatch(login(email, password));
  }

  const demoUser2 = async (e) => {
    setEmail('Tony@ironman.io');
    setPassword('password')
    await dispatch(login(email, password));
  }

  const demoUser3 = async (e) => {
    setEmail('bill@microsoft.com');
    setPassword('password')
    await dispatch(login(email, password));
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <span className='container-login-page'>
      <header className='container-login-header'>
        <div className='header-left-col'></div>
        <NavLink exact to="/" className='header-center-col'>slick</NavLink>
        <div className='header-right-col'>
          New to Slick?
          <div><NavLink to="/sign-up">Create an account</NavLink></div>
        </div>
      </header>
      <div className='text-sign-in'>
        <h1>Sign in to <span className='text-sign-in-slick'>Slick</span></h1>
        <p className='text-sign-in-suggest'>Welcome back to Slick</p>
      </div>
      <form onSubmit={onLogin} className='form-container'>
        <div className='container-demo-users'>
          <div>
            <button
              className='demo-login-btn demo-user-1'
              type='submit'
              onClick={demoUser1}
            >Demo User 1</button>
          </div>
          <div>
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
          </div>
        </div>
        <div className='container-content-rule'>
          <hr className='horizontal-line line-left'></hr>
          <div className='content-rule-center'> OR </div>
          <hr className='horizontal-line line-right'></hr>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'><span className='input-login-text'>Email</span></label>
          <div className='input'>
            <input
              className='login-input-field'
              name='email'
              type='text'
              placeholder='name@work-email.com'
              value={email}
              onChange={updateEmail}
            />
          </div>
        </div>
        <div>
          <label htmlFor='password'><span className='input-login-text'>Password</span></label>
          <div className='input'>
            <input
              className='login-input-field'
              name='password'
              type='password'
              placeholder='Your password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type='submit' className='login-btn'>Login</button>
          </div>
        </div>
      </form>
    </span>
  );
};

export default LoginForm;
