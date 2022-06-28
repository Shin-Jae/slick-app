import './UserChannels.css'
import CreateChannelModal from '../ChannelModal'
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';


const UserChannels = () => {
  const dispatch = useDispatch();
  const { userId, channelId } = useParams();
  const allChannels = useSelector((state) => state.channels);
  const allUsers = useSelector((state) => state.search);
  const channels = Object.values(allChannels);

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);

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
          </li>
        })}
        < CreateChannelModal />
      </ul>
    </>
  );
}

export default UserChannels;