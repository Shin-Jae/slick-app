import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
// import Route from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import MainPage from './components/Mainpage';
import Channels from './components/Mainpage/Channels';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './components/PageNotFound';
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
      <NavBar loaded={loaded} />
      <Route exact path='/login'>
        <LoginForm />
      </Route>
      <Route exact path='/sign-up'>
        <SignUpForm />
      </Route>
      <PrivateRoute>
        <Switch>
          <Route exact path='/users/:userId'>
            <MainPage />
          </Route>
          <Route exact path='/users/:userId/:channelId'>
            <Channels />
          </Route>
          <Route exact path='/users' >
            <UsersList />
          </Route>
          <Route exact path='/user/:userId'>
            <User />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </PrivateRoute>
    </BrowserRouter >
  );
}

export default App;
