import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import MainPage from './components/Mainpage';
import Channels from './components/Mainpage/Channels';
import PrivateRoute from './components/PrivateRoute';
// import Chat from './components/TestChat'

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path='/login' exact={true}>
					<LoginForm />
				</Route>
				<Route path='/sign-up' exact={true}>
					<SignUpForm />
				</Route>
				<PrivateRoute>
					<Switch >
						<ProtectedRoute exact path='/users/:userId'>
							<MainPage />
							{/* <Chat /> */}
						</ProtectedRoute>
						<ProtectedRoute path='/users/:userId/:channelId'>
							<Channels />
						</ProtectedRoute>
					</Switch>
					<ProtectedRoute path='/users' exact={true} >
						<UsersList />
					</ProtectedRoute>
					<ProtectedRoute path='/user/:userId' exact={true} >
						<User />
					</ProtectedRoute>
					<ProtectedRoute path='/' exact={true} >
						<h1>My Home Page</h1>
					</ProtectedRoute>
				</PrivateRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
