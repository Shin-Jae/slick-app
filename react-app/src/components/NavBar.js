import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Search from './Search';

const NavBar = () => {
	const user = useSelector((state) => state.session.user)

	if (!user) {
		return (
			<nav className='navbar'>
				{/* <p>Logged-in: {`user.id: ${id} name: ${first_name} ${last_name}`}</p> */}
				<ul>
					<li>
						{/* <NavLink to='/' exact={true} activeClassName='active'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/login' exact={true} activeClassName='active'>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink to='/sign-up' exact={true} activeClassName='active'>
							Sign Up
						</NavLink> */}
					</li>
				</ul>
			</nav>
		);
	} else {
		const { id, first_name, last_name } = user;
		return (
			<nav className='navbar'>
				<p>Logged-in: {`id: ${id}, ${first_name} ${last_name}`}</p>
				<Search />
				<ul>
					<li>
						<NavLink to='/users' exact={true} activeClassName='active'>
							Users
						</NavLink>
					</li>
					{/* <li>
						<NavLink to={`/users/${id}`} exact={true} activeClassName='active'>
							Main Page
						</NavLink>
					</li> */}
					<li>
						<LogoutButton />
					</li>
				</ul>
			</nav>
		)
	}
}

export default NavBar;
