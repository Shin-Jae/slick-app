import './DMs.css'
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';


const DMs = () => {
  const dispatch = useDispatch();
  const { userId, channelId } = useParams();
  const userEmail = useSelector((state) => state.session.user.email);
  const allChannels = useSelector((state) => state.channels);
  const channels = Object.values(allChannels);

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);

  return (
    <>
      <div>DMs</div>
      <ul className="view-dms" style={{ listStyleType: "none" }}>
        {channels.map(channel => {
          return <li className="one-dm" key={`channel-${channel.id}`}>
            {channel.private_chat ?
              <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                {channel.members.map(member => {
                  if (member.email !== userEmail) return <span key={`${member.id}`}>{member.first_name} </span>
                })}
              </NavLink> : null
            }
          </li>
        })}
      </ul>
    </>
  );
}

export default DMs;
