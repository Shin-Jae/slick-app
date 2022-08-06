import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import './DropdownMenu.css'
import SearchIcon from '../SearchIcon'

const DropdownMenu = () => {
  const user = useSelector((state) => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
    <>
      <div
        className='navbar__profile'
        onClick={openMenu}
      >
        <SearchIcon image={user.profile_img} first_letter={user.first_name[0]} />
      </div>
      {showMenu && (
        <div className='navbar__dropdown'>
          <p className="navbar__dropdown--user navbar__dropdown--text">
            Hi {`${user.first_name} ${user.last_name} !`}
          </p>
          <p className='navbar__dropdown--email navbar__dropdown--text'>
            {user.email}
          </p>
          <div className='navbar__dropdown--logout'>
            <button
              onClick={logout}
              className='navbar__dowpdown--button'>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DropdownMenu
