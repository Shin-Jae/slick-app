import './UserChannels.css'
import CreateChannelModal from '../ChannelModal'
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import EditChannelModal from "../EditChannelModal";
import { deleteChannel } from '../../store/channels';

const UserChannels = () => {
  const { userId, channelId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const allChannels = useSelector((state) => state.channels);
  const allUsers = useSelector((state) => state.search);
  const channels = Object.values(allChannels);
  const logInId = useSelector((state) => state.session.user.id)
  const user = useSelector((state) => state.session.user)
  const userEmail = useSelector((state) => state.session.user.email);
  const [deleted, setDeleted] = useState(false)
  const allMessages = useSelector((state) => state.messages);
  // const messages = Object.values(allMessages);

  useEffect(() => {
    dispatch(getAllChannels(logInId));
    dispatch(getAllMessages(logInId, channelId))
  }, [dispatch, logInId, channelId, deleted]);
 
  const removingChannel = async (channelId) => {
 
    let deletedChannel;
    try {
      deletedChannel = await dispatch(deleteChannel(channelId));
    } catch (error) {
      alert(error)
    }

    if (deletedChannel) {
      setDeleted(true)
      
    }
    setDeleted(false)
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
            {user.id === channel.owner_id && <button onClick={() => removingChannel(channel.id)} style={{ cursor: "pointer" }}>Delete Channel</button>}
          </li>
        })}
        < CreateChannelModal />
      </ul>
    </>
  );
}

export default UserChannels;
