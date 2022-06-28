import './UserChannels.css'
import CreateChannelModal from '../ChannelModal'
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import EditChannelModal from "../EditChannelModal";
import { deleteChannel } from '../../store/channels';

const UserChannels = () => {
  const { userId, channelId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const allChannels = useSelector((state) => state.channels);
  const allUsers = useSelector((state) => state.search);
  const channels = Object.values(allChannels);
  
  const user = useSelector((state) => state.session.user)
  const userEmail = useSelector((state) => state.session.user.email);

  const allMessages = useSelector((state) => state.messages);
  // const messages = Object.values(allMessages);
  
  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);
  
  const removingChannel = async (channelId) => {
    // e.preventDefault()
    dispatch(deleteChannel(channelId))
    
  }

  if (!Object.keys(allUsers).length) return null;

  return (
    <>
      <div>Channels</div>
      <ul className="view-channels" style={{ listStyleType: "none" }}>
        {channels.map(channel => {

          return <li className="one-channel" key={`channel-${channel.id}`}>
            {channel.private_chat ? null :
              <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                {channel.name}
              </NavLink>
            }
            {channel.private_chat ? null : < EditChannelModal channelId={channel.id} userId={user.id} owner_id={channel.owner_id} />}
            {user.id === channel.owner_id && <button onClick={() => removingChannel(channel.id)} style={{cursor:"pointer"}}>Delete Channel</button>}
          </li>
        })}
        < CreateChannelModal />
      </ul>
    </>
  );
}

export default UserChannels;
