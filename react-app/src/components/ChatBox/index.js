import './ChatBox.css'
import MessageInput from '../MessageInput/';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getAllChannels } from '../../store/channels';
import { getAllMessages, updateMessage } from '../../store/messages';
import MessageContent from '../MessageContent'
import { io } from 'socket.io-client';
import { useResolvedPath } from 'react-router';

let socket;

const ChatBox = () => {
  const dispatch = useDispatch()
  const bottomRef = useRef(null);
  const { channelId, userId } = useParams()
  const allMessages = useSelector((state) => state.messages);
  const channels = useSelector((state) => state.channels)
  const currentChannel = channels[channelId];

  const messages = Object.values(allMessages);
  const [messageReceived, setMessageReceived] = useState('')
  const [updateComplete, setUpdateComplete] = useState('')
  const [messageUpdated, setMessageUpdated] = useState('')
  const [createMessage, setCreateMessage] = useState('')
  const [onDelete, setOnDelete] = useState(false)
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
  }, [dispatch, userId, channelId, messageReceived, messageUpdated, updateComplete, onDelete]);

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

    socket.emit('update', updateComplete)
    socket.on('update', (data) => {
      setMessageUpdated(data)
    });

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



  if (!Object.keys(channels).length) return null

  return (
    <div className='chatbox'>
      <div className='chatbox__header'>
        <h2 className='chatbox__header--text'>
          {privateMembers ?
            (`${privateMembers}`) :
            (`#${currentChannel.name}`)
          }
        </h2>
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
