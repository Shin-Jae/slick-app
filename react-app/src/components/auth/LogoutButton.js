import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className="log_out_button" onClick={onLogout} style={{cursor:'pointer'}}>Log Out of Slick</button>;
};

export default LogoutButton;
