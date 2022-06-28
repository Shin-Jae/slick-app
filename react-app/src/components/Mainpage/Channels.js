import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import ChatBox from "../ChatBox";
import './Channels.css'
import MessageInput from '../MessageInput/';
import Sidebar from "../Sidebar";

function Channels() {
  const { userId, channelId } = useParams();
  const dispatch = useDispatch();

  const allChannels = useSelector((state) => state.channels);
  const allUsers = useSelector((state) => state.search);
  const channels = Object.values(allChannels);
  // const user = useSelector((state) => state.session.user);

  const userEmail = useSelector((state) => state.session.user.email);

  const allMessages = useSelector((state) => state.messages);
  // const messages = Object.values(allMessages);

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);

  if (!Object.keys(allUsers).length) return null;

  return (
    <div className='main-display'>
      <div className='main-display__sidebar'>
        <Sidebar />
      </div>
      <div className='main-display__chatbox'>
        {channelId && <ChatBox />}
      </div>
    </div>
  )
}

export default Channels;
