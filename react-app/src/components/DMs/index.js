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
  const { channelId } = useParams();
  const allChannels = useSelector((state) => state.channels);
  const channels = Object.values(allChannels);
  const { id } = useSelector((state) => state.session.user);
  const [hoverDisplay, setHoverDisplay] = useState(false)
  const [hide, setHide] = useState(false)

  const privateChannels = channels.filter(channel => channel.private_chat)
  useEffect(() => {
    dispatch(getAllChannels(id));
    if (channelId) {
      dispatch(getAllMessages(id, channelId))
    }
  }, [dispatch, id, channelId]);

  const handleToggle = () => {
    setHide(prev => !prev)
  }

  return (
    <div className='user__channels-display'>
      <div className='channels__header-container'
        onMouseEnter={(e) => setHoverDisplay(true)}
        onMouseLeave={(e) => setHoverDisplay(false)}
      >
        <div className='channels__header-right'>
          <span
            className="material-symbols-outlined arrow__dropdown"
            onClick={handleToggle}
            style={
              hide ?
                {
                  transform: 'rotate(-90deg)',
                  transition: 'transform 300ms ease'
                } :
                {
                  transform: 'rotate(0deg)',
                  transition: 'transform 300ms ease'
                }
            }
          >
            arrow_drop_down
          </span>
          <p
            className='channels__header-text'
            onClick={handleToggle}
          >
            Direct Messages
          </p>
        </div>
        <div>
          <CreateDMModal hoverDisplay={hoverDisplay} />
        </div>
      </div>
      {!hide && <ul
        className="view-dms view-channels"
      >
        {privateChannels.map(channel =>
          <DMChannel channel={channel} key={channel.id} />
        )}
      </ul>}
    </div>
  );
}

export default DMs;
