import { Link } from 'react-router-dom';
import './UnauthorizedUser.css';


const UnauthorizedUser = ({ userId }) => {
    return (
      <div className='redirect'>
        <div className='redirect__card form__card'>
        <h2 className='header-title'>How did you get here?</h2>
        <ul>
          <li className='redirect__text'><Link to={`/users/${userId}`}>Back to your channels...</Link></li>
          {/* <li className='redirect__text'><Link to='/'>Back to all listings</Link></li> */}
        </ul>
        </div>
      </div>
  )
}

export default UnauthorizedUser;