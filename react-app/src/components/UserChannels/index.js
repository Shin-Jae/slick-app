import './UserChannels.css'
import CreateChannelModal from '../ChannelModal'
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import EditChannelModal from "../EditChannelModal";

const UserChannels = () => {
  const { userId, channelId } = useParams();
  const dispatch = useDispatch();

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

  if (!Object.keys(allUsers).length) return null;

  return (
    <>
      <div>Channels</div>
      <ul className="view-channels" style={{ listStyleType: "none" }}>
        {channels.map(channel => {

          return <li className="one-channel" key={`channel-${channel.id}`}>
            {channel.private_chat ? null :
              <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                # {channel.name}
              </NavLink>
            }
            {channel.private_chat ? null : < EditChannelModal channelId={channel.id} userId={user.id} owner_id={channel.owner_id} />}

          </li>
        })}
        < CreateChannelModal />
      </ul>
    </>
  );
}

export default UserChannels;
