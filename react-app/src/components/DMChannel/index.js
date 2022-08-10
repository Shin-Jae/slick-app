import './DMChannel.css'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react';
import DeleteDMButton from '../DeleteDMButton';
import UserIcon from '../UserIcon';


const DMChannel = ({ channel }) => {
  const [showDelete, setShowDelete] = useState(false)
  const { email, id } = useSelector((state) => state.session.user);

  let DMNames = [];

  channel.members.forEach(member => {
    if (member.email !== email) {
      DMNames.push(member.first_name)
    }
  })

  let DMString = DMNames.join(', ');

  if (DMNames.length > 2) {
    DMString = `${DMNames[0]}, ${DMNames[2]} ...`
  }

  return (
    <li className="one-dm" key={`channel-${channel.id}`}>
      <div className='dms__list-item'
        onMouseEnter={(e) => setShowDelete(true)}
        onMouseLeave={(e) => setShowDelete(false)}
      >
        {channel.members.length === 1 ?
          (<NavLink className='dms__link' activeClassName="dm-blue" activeStyle={{ color: 'white' }}
            exact to={`/users/${id}`} style={{ textDecoration: "none", color: "black" }}>
            <div className='dms__list-item--icon-name'>
              <div className='dms__list-item--icon-container'>
                <UserIcon members={channel.members} />
              </div>
              <div className='dms__list-item--name-container'>
                {`${channel.members[0].first_name} ${channel.members[0].last_name} (you)`}
              </div>
            </div>
          </NavLink>)
          :
          (
            <>
              <NavLink className='dms__link' activeClassName="dm-blue" activeStyle={{ color: 'white' }}
                exact to={`/users/${id}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                <div className='dms__list-item--icon-name'>
                  <div className='dms__list-item--icon-container'>
                    <UserIcon members={channel.members} />
                  </div>
                  <div className='dms__list-item--name-container'>
                    {DMString}
                  </div>
                </div>
              </NavLink>
              <div className='dm__delete-container'>
                <DeleteDMButton currentChannelId={channel.id} showDelete={showDelete} />
              </div>
            </>)}
      </div>
    </li>
  );
}

export default DMChannel;
