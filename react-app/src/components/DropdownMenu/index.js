import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import './DropdownMenu.css'

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
    
    history.push('/login')
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
    <div className='profile-button'>
      <div className='profile-dropdown'>
        <div children='profile-dropdown-interior'>
           <img
        className='profile_img'
        onClick={openMenu}
        style={{ cursor: "pointer" }}
        alt=''
        src={user.profile_img} />
        </div>
      </div>

     

      {showMenu && (
      <div className='drop-down-menu'>
        <div className='drop-down-menu-detail'>
          <div className='drop-down-menu-box'>
            <div className="user_detail">Hi {`${user.first_name} ${user.last_name}!`}!</div>
            <div className='log_out_button'> <button onClick={logout}
              
              style={{ cursor: 'pointer' }} >Log Out of Slick</button>
            </div>
          </div>

        </div>
      </div>



      )}
    </div>

  )
}
export default DropdownMenu