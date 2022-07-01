import './Sidebar.css'
import DMs from '../DMs';
import UserChannels from '../UserChannels';

// test
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div>
        <UserChannels />
      </div>
      <div>
        <DMs />
      </div>
    </div>
  );
}

export default Sidebar
