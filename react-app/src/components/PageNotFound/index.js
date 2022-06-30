import './PageNotFound.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
const PageNotFound = () => {
  const user = useSelector((state) => state.session.user)

  return (
    <>
    <div className='redirect'>
      <div className='redirect__card form__card'>
        <h2 className='header-title'>Sorry, we can't find what you're looking for...</h2>
        <ul>
          <li className='redirect__text'><NavLink to={`/users/${user.id}`}>Click here to start chatting</NavLink></li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default PageNotFound;