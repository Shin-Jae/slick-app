import './DMs.css'
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import CreateDMModal from '../CreateDMs';
import EditDMModal from '../EditDMs';
import UserIcon from '../UserIcon';

const DMs = () => {
  const dispatch = useDispatch();
  const { userId, channelId } = useParams();
  const [deleted, setDeleted] = useState(false)
  const userEmail = useSelector((state) => state.session.user.email);
  const allChannels = useSelector((state) => state.channels);
  const channels = Object.values(allChannels);
  console.log("userid", userId, channelId);

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);


  const handleDelete = async (channelId) => {
    // console.log(channelId)
    let deletedDM;

    // try {
    //   deletedDM = await dispatch(deleteDM(channelId))
    // } catch (error) {
    //   alert(error)
    // }

    // if (deletedDM) {
    //   setDeleted(true)
    //   resetState()
    // }
  }

  const resetState = () => {
    setDeleted(false)
  }

  return (
    <>
      <div>DMs</div>
      <div>
        <CreateDMModal />
      </div>
      <ul className="view-dms" style={{ listStyleType: "none" }}>
        {channels.map(channel => {
          return <li className="one-dm" key={`channel-${channel.id}`}>
            {channel.private_chat ?
              <div className='dms__list-item'>
                <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                  <div className='dms__list-item--icon-name'>
                    <div className='dms__list-item--icon-container'>
                      <UserIcon />
                    </div>
                    <div className='dms__list-item--name-container'>
                      {channel.members.map(member => {
                        if (member.email !== userEmail) {
                          return <span key={`${member.id}`}> - {member.first_name}</span>
                        }
                        if (channel.owner_id === parseInt(userId)) {
                          return < EditDMModal channelId={channel.id} />
                        }
                      })}
                    </div>
                  </div>

                </NavLink>
                <div className='dms__list-item--delete-container'>
                  <button onClick={() => handleDelete(channel.id)}>X</button>
                </div>
              </div>
              : null
            }
          </li>
        })}
      </ul>
    </>
  );
}

export default DMs;
