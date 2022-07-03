import './DMs.css'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import CreateDMModal from '../CreateDMs';
import DMChannel from '../DMChannel';

const DMs = () => {
  const dispatch = useDispatch();
  const { userId, channelId } = useParams();
  const allChannels = useSelector((state) => state.channels);
  const channels = Object.values(allChannels);
  const { id } = useSelector((state) => state.session.user);
  const [hoverDisplay, setHoverDisplay] = useState(false)

  const privateChannels = channels.filter(channel => channel.private_chat)

  useEffect(() => {
    dispatch(getAllChannels(id));
    if (channelId) {
      dispatch(getAllMessages(id, channelId))
    }
  }, [dispatch, id, channelId]);

  return (
    <div className='user__channels-display'>
      <div className='channels__header-container'
        onMouseEnter={(e) => setHoverDisplay(true)}
        onMouseLeave={(e) => setHoverDisplay(false)}
      >
        <p className='channels__header-text'>Direct Messages</p>
        <div>
          <CreateDMModal hoverDisplay={hoverDisplay} />
        </div>
      </div>
      <ul className="view-dms view-channels" style={{ listStyleType: "none" }}>
        {privateChannels.map(channel =>
          <DMChannel channel={channel} key={channel.id} />
        )}
      </ul>
    </div>
  );
}

export default DMs;
