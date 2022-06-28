import './Sidebar.css'
import DMs from '../DMs';
import UserChannels from '../UserChannels';


const Sidebar = () => {
  return (
    <>
      <UserChannels />
      <DMs />
    </>
  );
}

export default Sidebar