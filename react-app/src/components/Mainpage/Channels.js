import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import ChatBox from "../ChatBox";
import './Channels.css'
import DMs from '../DMs';
import UserChannels from '../UserChannels';

function Channels() {
  const { userId, channelId } = useParams();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.search);


  useEffect(() => {
    dispatch(getAllChannels(userId));
    if (channelId) {
      dispatch(getAllMessages(userId, channelId))
    }
  }, [dispatch, userId, channelId]);

  if (!Object.keys(allUsers).length) return null;

  return (
    <div className='main-display'>
      <div className='main-display__sidebar'>
        <div>
          <UserChannels />
        </div>
        <div>
          <DMs />
        </div>
      </div>
      <div className='main-display__chatbox'>
        {channelId && <ChatBox />}
      </div>
    </div >
  )
}

export default Channels;
