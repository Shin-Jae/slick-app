import './ChatBox.css'
import MessageInput from '../MessageInput/';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getAllChannels } from '../../store/channels';
import { getAllMessages, updateMessage } from '../../store/messages';
import EditChannelModal from '../EditChannelModal';
import MessageContent from '../MessageContent'
import EditDMModal from '../EditDMs';
import { deleteChannel } from '../../store/channels';
import { io } from 'socket.io-client';


let socket;

const ChatBox = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const bottomRef = useRef(null);
  const { channelId, userId } = useParams()
  const allMessages = useSelector((state) => state.messages);
  const channels = useSelector((state) => state.channels);
  const logInId = useSelector((state) => state.session.user.id);
  const currentChannel = channels[channelId];

  const messages = Object.values(allMessages);
  const [deleted, setDeleted] = useState(false);
  const [messageReceived, setMessageReceived] = useState('')
  const [updateComplete, setUpdateComplete] = useState('')
  const [messageUpdated, setMessageUpdated] = useState('')
  const [createMessage, setCreateMessage] = useState('')
  const [onDelete, setOnDelete] = useState(false)
  const [owner, setOwner] = useState(false)
  // const [name, setName] = useState("")
  //   const [description, setDescription] = useState("")

  let privateMembers;

  if (currentChannel?.private_chat) {
    privateMembers = currentChannel.members.filter(user =>
      +user.id !== +userId
    ).map(user => `${user.first_name} ${user.last_name}`).join(', ')
  }

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
    setOwner(currentChannel?.owner_id == parseInt(userId))
  }, [dispatch, userId, channelId, messageReceived, messageUpdated, updateComplete, onDelete, deleted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dispatch, channelId, messageReceived]);

  // useEffect(() => {
    //   if (channels[channelId]) {
      //     setName(channels[channelId].name)
      //     setDescription(channels[channelId].description)
      //   }
      // })

      useEffect(() => {
        socket = io();

        // socket.emit('update', updateComplete)
        // socket.on('update', (data) => {
          //   setMessageUpdated(data)
          // });

          socket.emit('chat', createMessage)
          socket.on("chat", (data) => {
            setMessageReceived(data)
          })

          socket.emit('delete')
          socket.on("delete", (data) => {
            setOnDelete(false)
          })
          return (() => {
            socket.disconnect()
          })
        }, [updateComplete, createMessage, onDelete])

        const removingChannel = async (deletechannelId) => {

          let deletedChannel;
          try {
            deletedChannel = await dispatch(deleteChannel(deletechannelId));

          } catch (error) {
            alert(error)
          }

          if (deletedChannel) {
            setDeleted(true)
            if (deletedChannel.id == channelId) {
              history.push(`/users/${logInId}`)
            }
          }
          setDeleted(false)

        }

        if (!Object.keys(channels).length) return null;
        console.log('current channel', currentChannel)

        if (!currentChannel) {
          return (
            <Redirect to={`/users/${logInId}`}/>
          )
        }

        return (
          <div className='chatbox'>
      <div className='chatbox__header'>
        <div className='chatbox__header--text-container'>
          <h2 className='chatbox__header--text'>
            {privateMembers ?
              (`${privateMembers}`) :
              (`#${currentChannel.name}`)
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
            <h2>{
            owner &&
            !currentChannel.private_chat &&
            <EditChannelModal
              channelId={currentChannel.id}
              userId={userId}
              owner_id={currentChannel.owner_id}
            />}
          </h2>
          <h2>
            {+userId === +currentChannel.owner_id &&
              !currentChannel.private_chat &&
              <button
                className='chatbox__header--buttons'
                onClick={() => removingChannel(currentChannel.id)}
                style={{ cursor: "pointer" }}>
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>}
          </h2>
          </div>

        </div>
      </div>
      <div className='chatbox__messages'>
        <ul className="chatbox__messages--list" style={{ listStyleType: "none" }}>
          {messages.map(message =>
            <li className="one-message" key={`message-${message.id}`}>
              <MessageContent message={message} setUpdateComplete={setUpdateComplete} setOnDelete={setOnDelete} />
            </li>
          )}
        </ul>
        <div ref={bottomRef} />
      </div>
      <div className='chatbox__input'>
        <MessageInput setMessageReceived={setMessageReceived} setCreateMessage={setCreateMessage} />
      </div>
    </div>
  );
}


export default ChatBox;
