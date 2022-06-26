import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import MessageInput from '../MessageInput/'

function Channels() {
    const { userId, channelId } = useParams();
    const dispatch = useDispatch();
    // console.log(channelId, userId)

    const allChannels = useSelector((state) => state.channels);
    const channels = Object.values(allChannels);

    const userEmail = useSelector((state) => state.session.user.email);

    const allMessages = useSelector((state) => state.messages);
    const messages = Object.values(allMessages);

    useEffect(() => {
        dispatch(getAllChannels(userId));
        dispatch(getAllMessages(userId, channelId))
    }, [dispatch, userId, channelId]);

    return (
        <div>
            <div>Channels</div>
            <ul className="view-channels" style={{ listStyleType: "none" }}>
                {channels.map(channel => {
                    return <li className="one-channel" key={`channel-${channel.id}`}>
                        {channel.private ? null :
                            <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                                {channel.name}
                            </NavLink>
                        }
                    </li>
                })}
            </ul>
            <div>DMs</div>
            <ul className="view-dms" style={{ listStyleType: "none" }}>
                {channels.map(channel => {
                    return <li className="one-dm" key={`channel-${channel.id}`}>
                        {channel.private ?
                            <NavLink exact to={`/users/${userId}/${channel.id}`} style={{ textDecoration: "none", color: "black" }}>
                                {channel.members.map(member => {
                                    if (member.email !== userEmail) return <span key={`${member.id}`}>{member.first_name} </span>
                                })}
                            </NavLink> : null
                        }
                    </li>
                })}
            </ul>
            {channelId && <div>
                <div>Messages</div>
                <ul className="messages" style={{ listStyleType: "none" }}>
                    {messages.map(message => {
                        return <li className="one-message" key={`message-${message.id}`}>
                            {message.content}
                        </li>
                    })}
                </ul>
                <MessageInput />
            </div>}
        </div>
    )
}

export default Channels;
