// import './DMChannel.css'
// import { NavLink, useParams } from "react-router-dom";
// import { useState } from 'react';


// const DMChannel = ({ channels }) => {
//   const [showDelete, setShowDelete] = useState(false)


//   return (
//     <div>
//       <ul className="view-dms" style={{ listStyleType: "none" }}>
//         {channels.map(channel => {
//           return <li className="one-dm" key={`channel-${channel.id}`}>
//             {channel.private_chat ?
//               <div className='dms__list-item'
//                 onMouseEnter={(e) => setShowDelete(true)}
//                 onMouseLeave={(e) => setShowDelete(false)}
//               >
//                 <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
//                   <div className='dms__list-item--icon-name'>
//                     <div className='dms__list-item--icon-container'>
//                       <UserIcon />
//                     </div>
//                     <div className='dms__list-item--name-container'>
//                       {channel.members.map(member => {
//                         if (member.email !== userEmail) {
//                           return <span key={`${member.id}`}> - {member.first_name}</span>
//                         }
//                         if (channel.owner_id === parseInt(userId)) {
//                           return < EditDMModal channelId={channel.id} />
//                         }
//                       })}
//                     </div>
//                   </div>
//                 </NavLink>
//                 <div >
//                   <DeleteDMButton channelId={channel.id} showDelete={showDelete} />
//                 </div>
//               </div>
//               : null
//             }
//           </li>
//         })}
//       </ul>
//     </div>
//   );
// }

// export default DMChannel;