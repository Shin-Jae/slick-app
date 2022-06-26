import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
      <div>
        <button
          type='submit'
          onClick={demoUser1}
        >Demo User 1</button>
      </div>
      <div>
        <button
          type='submit'
          onClick={demoUser2}
        >Demo User 2</button>
      </div>
      <div>
        <button
          type='submit'
          onClick={demoUser3}
        >Demo User 3</button>
      </div>
    </form>
  );
};

export default LoginForm;
