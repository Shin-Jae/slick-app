import './ChatBox.css'
import MessageInput from '../MessageInput/';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import EditChannelModal from '../EditChannelModal';
import MessageContent from '../MessageContent'
import EditDMModal from '../EditDMs';
import { deleteChannel } from '../../store/channels';
import { io } from 'socket.io-client';
import Typing from '../Typing'
import ReactTooltip from "react-tooltip";
import Welcome from '../Welcome'

let socket;

const ChatBox = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const bottomRef = useRef(null);
  let { channelId, userId } = useParams()
  const allMessages = useSelector((state) => state.messages);
  const channels = useSelector((state) => state.channels);
  const logInId = useSelector((state) => state.session.user.id);
  let currentChannel = channels[channelId];
  const messages = Object.values(allMessages);
  const [deleted, setDeleted] = useState(false);
  const [messageReceived, setMessageReceived] = useState('')
  const [updateComplete, setUpdateComplete] = useState('')
  const [messageUpdated, setMessageUpdated] = useState('')
  const [prevMessage, setPrevMessage] = useState('')
  const [createMessage, setCreateMessage] = useState('')
  const [onDelete, setOnDelete] = useState(false)
  const data = useParams();
  const [home, setHome] = useState(!data['channelId'])
  const [owner, setOwner] = useState(false)
  const [typing, setTyping] = useState(false)
  const [otherTyping, setOtherTyping] = useState('')
  const [userTyping, setUserTyping] = useState('')


  let privateMembers;

  if (home) {
    const privateChannel = Object.values(channels).filter(channel =>
      channel.members.length === 1 && channel.members[0].id === +userId)
    if (privateChannel.length) {
      currentChannel = privateChannel[0]
    }
  }

  if (currentChannel?.private_chat) {
    privateMembers = currentChannel.members.filter(user =>
      +user.id !== +userId
    ).map(user => `${user.first_name} ${user.last_name}`).join(', ')
  }

  useEffect(() => {
    if (!channelId) {
      const privateChannel = Object.values(channels).filter(channel =>
        channel.members.length === 1 && channel.members[0].id === +userId)
      if (privateChannel.length) {
        channelId = privateChannel[0].id;
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getAllChannels(userId));
    if (channelId) {
      dispatch(getAllMessages(userId, channelId))
    }
    setOwner(currentChannel?.owner_id === parseInt(userId))
  }, [dispatch, userId, channelId, messageReceived, updateComplete, onDelete, deleted]);

  let timeout;
  clearTimeout(timeout)

  if (otherTyping.typing) {
    timeout = setTimeout(() => {
      setTyping(false);
    }, 3000);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [dispatch, currentChannel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dispatch, messageReceived]);

  useEffect(() => {
    socket = io();

    socket.emit('typing', {
      id: userTyping.id,
      userName: `${userTyping.first_name} ${userTyping.last_name}`,
      typing: typing > 1,
      channel: currentChannel?.id
    })

    clearTimeout(timeout)

    socket.on('typing', (data) => {
      setOtherTyping(data)
      clearTimeout(timeout)
    })

    // socket.emit('update', {
    //   old_message: prevMessage,
    //   new_message: messageUpdated
    // })

    // socket.on('update', (data) => {
    //   setMessageUpdated(data.new_message)
    // })

    socket.emit('chat', createMessage)
    socket.on("chat", (data) => {
      setMessageReceived(data)
      // if (channels[messageReceived.channel_id]) {
      //   channels[messageReceived.channel_id]['notify'] = true
      //   setNotification(channels[messageReceived.channel_id])
      //   console.log('notification', notification)
      // }
    })

    socket.emit('delete')
    socket.on("delete", (data) => {
      setOnDelete(false)
    })
    return (() => {
      socket.disconnect()
    })
  }, [updateComplete, createMessage, onDelete, typing, userTyping])

  const removingChannel = async (deletechannelId) => {

    let deletedChannel;
    try {
      deletedChannel = await dispatch(deleteChannel(deletechannelId));

    } catch (error) {
      alert(error)
    }

    if (deletedChannel) {
      setDeleted(true)
      if (deletedChannel.id === parseInt(channelId)) {
        history.push(`/users/${logInId}`)
      }
    }
    setDeleted(false)

  }

  if (!Object.keys(channels).length) return null;
  if (!currentChannel) return null;


  const getStrings = (messages) => {
    return (
      messages.map((message, i) =>
        <>
          <div className='date__container'>
            {i === 0 &&
              <div className='date__string-container'>
                <p className='date__string'>{getHumanDate(messages[0].created_at)}</p>
              </div>
            }
            {
              i > 0 &&
              getDate(messages[i - 1]) !== getDate(message) &&
              <div className='date__string-container'>
                <p className='date__string'>{getHumanDate(message.created_at)}</p>
              </div>
            }
          </div>
          <li className="one-message" key={`message-${message.id}`}>
            {i > 0 && getDate(messages[i - 1]) !== getDate(message) && <div className='date__line' />}
            <MessageContent
              message={message}
              setUpdateComplete={setUpdateComplete}
              setOnDelete={setOnDelete}
              setMessageUpdated={setMessageUpdated}
              setPrevMessage={setPrevMessage}
            />
          </li>
        </>
      )
    )
  }
  const getDate = (message) => {
    const { created_at } = message;
    return created_at.slice(0, 11)
  }

  const getHumanDate = (message) => {
    let messageArray = message.split(' ');
    const days = {
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday',
      'Sun': 'Sunday'
    }

    const months = {
      'Jan': 'January',
      'Feb': 'February',
      'Mar': 'March',
      'Apr': 'April',
      'May': 'May',
      'Jun': 'June',
      'Jul': 'July',
      'Aug': 'August',
      'Sep': 'September',
      'Oct': 'October',
      'Nov': 'November',
      'Dec': 'December'
    }

    const numberSuffix = {
      0: 'th',
      1: 'st',
      2: 'nd',
      3: 'rd',
      4: 'th',
      5: 'th',
      6: 'th',
      7: 'th',
      8: 'th',
      9: 'th',
    }

    let day = days[messageArray[0].slice(0, 3)];
    let date = +messageArray[1];
    let month = months[messageArray[2]];
    date = date.toString();
    const dateSuffix = (numberSuffix[date[date.length - 1]]);
    const fullDateString = `${day}, ${month} ${date}${dateSuffix}`
    return fullDateString;
  }

  return (
    <div className='chatbox'>
      {home ? <Welcome /> :
        (!home && <div className='chatbox__header'>
          <div className='chatbox__header--text-container'>
            <h2 className='chatbox__header--text'>
              {privateMembers ?
                (`${privateMembers}`) :
                <>
                  <ReactTooltip id="header__tip" place="bottom" effect="solid">
                    {currentChannel.description}
                  </ReactTooltip>
                  <div className='chatbox__header--text-container-icons' data-tip data-for="header__tip">
                    <span className="material-symbols-outlined">
                      tag
                    </span>
                    {currentChannel.name}
                  </div>
                </>
              }
            </h2>
          </div>
          <div className='chatbox__header--icon-container'>
            <h2>{
              owner &&
              currentChannel.private_chat &&
              <EditDMModal
                channelId={currentChannel.id}
              />}
            </h2>
            <div className='chatbox__header--buttons-container'>
              <h2 className='h2__edit'>{
                owner &&
                !currentChannel.private_chat &&
                <EditChannelModal
                  channelId={currentChannel.id}
                  userId={userId}
                  owner_id={currentChannel.owner_id}
                />}
              </h2>
              <h2 className='h2__delete'>
                {+userId === +currentChannel.owner_id &&
                  !currentChannel.private_chat &&
                  <button
                    className='chatbox__header--buttons'
                    onClick={() => removingChannel(currentChannel.id)}
                    style={{ cursor: "pointer" }}>
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                  </button>}
              </h2>
            </div>
          </div>
        </div>)}
      <div className='chatbox__messages'>
        <ul className="chatbox__messages--list" style={{ listStyleType: "none" }}>
          {getStrings(messages)}
        </ul>
        <div ref={bottomRef} />
      </div>
      <div className='chatbox__input'>
        {otherTyping.typing &&
          +otherTyping.id !== +userId &&
          +otherTyping.channel == +currentChannel.id &&
          <div className='chatbox__typing--container'>
            <Typing person={otherTyping.userName} />
          </div>
        }
        <MessageInput
          channelId={currentChannel.id}
          setMessageReceived={setMessageReceived}
          setCreateMessage={setCreateMessage}
          setTyping={setTyping}
          setUserTyping={setUserTyping}
        />
      </div>
    </div>
  );
}


export default ChatBox;
