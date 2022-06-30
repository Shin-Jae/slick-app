import './DMChannel.css'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react';
import EditDMModal from '../EditDMs';
import DeleteDMButton from '../DeleteDMButton';
import UserIcon from '../UserIcon';


const DMChannel = ({ channel }) => {
  const [showDelete, setShowDelete] = useState(false)
  const { email, id } = useSelector((state) => state.session.user);


  return (
    <li className="one-dm" key={`channel-${channel.id}`}>
        <div className='dms__list-item'
          onMouseEnter={(e) => setShowDelete(true)}
          onMouseLeave={(e) => setShowDelete(false)}
        >
          <NavLink exact to={`/users/${id}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div className='dms__list-item--icon-name'>
              <div className='dms__list-item--icon-container'>
                <UserIcon members={channel.members}/>
              </div>
              <div className='dms__list-item--name-container'>
                {channel.members.map(member => {
                  if (member.email !== email) {
                    return <span key={`${member.id}`}> {member.first_name}</span>
                  }
                })}
              </div>
            </div>
          </NavLink>
          <div >
            <DeleteDMButton currentChannelId={channel.id} showDelete={showDelete} />
          </div>
        </div>
    </li>
  );
}

export default DMChannel;