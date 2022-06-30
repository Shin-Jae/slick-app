import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Search from './Search';

const NavBar = ({ loaded }) => {
  const user = useSelector((state) => state.session.user)

  let sessionNav;

  if (user) {
    const { id, first_name, last_name } = user;
    sessionNav = (
      <>
        <p>Logo HERE</p>
        <p>Logged-in: {`id: ${id}, ${first_name} ${last_name}`}</p>
        <Search />
        <LogoutButton />
      </>
    )
  } else {
    sessionNav = (
      <h2>Logo Here</h2>
    )
  }
  return (
    <nav className='navbar'>
      {loaded && sessionNav}
    </nav>
  )
}

export default NavBar;
