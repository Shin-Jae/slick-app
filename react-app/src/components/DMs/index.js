import './DMs.css'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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

  const privateChannels = channels.filter(channel => channel.private_chat)

  useEffect(() => {
    dispatch(getAllChannels(id));
    dispatch(getAllMessages(id, channelId))
  }, [dispatch, id, channelId]);

  return (
    <>
      <div className='channels__header-container'>
        <h3>Direct Messages</h3>
        <div>
          <CreateDMModal />
        </div>
      </div>
      <ul className="view-dms" style={{ listStyleType: "none" }}>
        {privateChannels.map(channel =>
          <DMChannel channel={channel} />
        )}
      </ul>
    </>
  );
}

export default DMs;
