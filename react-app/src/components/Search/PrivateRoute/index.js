import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const sessionUser = useSelector(state => state.session.user);

  return sessionUser ? children : <Redirect to='/' />;
}

export default PrivateRoute;