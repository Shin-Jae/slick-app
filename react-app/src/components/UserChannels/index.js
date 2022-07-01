import './UserChannels.css'
import CreateChannelModal from '../ChannelModal'
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const logInId = useSelector((state) => state.session.user.id)
  const [hoverDisplay, setHoverDisplay] = useState(false)
  // const user = useSelector((state) => state.session.user)
  // const userEmail = useSelector((state) => state.session.user.email);
  // const allMessages = useSelector((state) => state.messages);
  // const messages = Object.values(allMessages);

  useEffect(() => {
    dispatch(getAllChannels(logInId));
    dispatch(getAllMessages(logInId, channelId))
  }, [dispatch, logInId, channelId]);

  if (!Object.keys(allUsers).length) return null;

  return (
    <div className='main-channels__header-container'>
      <div className='channels__header-container'
        onMouseEnter={(e) => setHoverDisplay(true)}
        onMouseLeave={(e) => setHoverDisplay(false)}
      >
        <p className='channels__header-text'>Channels</p>
        <CreateChannelModal hoverDisplay={hoverDisplay} />
      </div>
      <ul className="view-channels" style={{ listStyleType: "none" }}>
        {channels.map(channel =>
          !channel.private_chat &&
          <NavLink activeClassName="blue" activeStyle={{ backgroundColor: '#1164A3', color: 'white' }} exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}  >
            <div className='one-channel-container' >
              <li className="one-channel" key={`channel-${channel.id}`}>
                <span className='hashtag-channels'>#</span>{`${channel.name}`}
              </li>
            </div>
          </NavLink>
        )}
      </ul>
    </div>
  );
}

export default UserChannels;
