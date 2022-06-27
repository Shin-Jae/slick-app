import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_img, setProfileImg] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, email, password, profile_img));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfileImg = (e) => {
    setProfileImg(e.target.value);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <span className='container-login-page'>
      <header className='container-login-header'>
        <div className='header-left-col'></div>
        <NavLink exact to="/" className='header-center-col'>slick</NavLink>
        <div className='header-right-col'>
          Already have an account?
          <div><NavLink to="/login">Sign in instead</NavLink></div>
        </div>
      </header>
      <div className='text-sign-in'>
        <h1>Join <span className='text-sign-in-slick'>Slick</span> today</h1>
        <p className='text-sign-in-suggest'>We suggest using the email address you use at work</p>
      </div>
      <form onSubmit={onSignUp} className='form-container'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>First Name</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='first_name'
            onChange={updateFirstName}
            value={first_name}
            placeholder='Your first name'
          ></input>
        </div>
        <label>Last Name</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='last_name'
            onChange={updateLastName}
            value={last_name}
            placeholder='Your last name'
          ></input>
        </div>
        <label>Email</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Your email'
          ></input>
        </div>
        <label>Password</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Please enter a password'
          ></input>
        </div>
        <label>Repeat Password</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Confirm password'
          ></input>
        </div>
        <label>Profile Image</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='profile_img'
            onChange={updateProfileImg}
            value={profile_img}
          ></input>
        </div>
        <button type='submit' className='login-btn'>Sign Up</button>
      </form>
    </span>
  );
};

export default SignUpForm;
