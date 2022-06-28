import './ChatBox.css'
import MessageInput from '../MessageInput/';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllChannels } from '../../store/channels';
import { getAllMessages, updateMessage } from '../../store/messages';
import MessageContent from '../MessageContent'
import { io } from 'socket.io-client';

let socket;

const ChatBox = () => {
  const dispatch = useDispatch()
  const { channelId, userId } = useParams()
  const allMessages = useSelector((state) => state.messages);
  const channels = useSelector((state) => state.channels)
  const messages = Object.values(allMessages);
  const [messageReceived, setMessageReceived] = useState('')
  const [updateComplete, setUpdateComplete] = useState('')
  const [messageUpdated, setMessageUpdated] = useState('')
  const [createMessage, setCreateMessage] = useState('')
  const [onDelete, setOnDelete] = useState(false)

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId, messageReceived, messageUpdated, updateComplete, onDelete]);


  useEffect(() => {
    socket = io();

    // socket.emit('join')

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

  // useEffect(() => {

  //   socket.on('update', (data) => {
  //     console.log('payload::: ', data)
  //   });

  //   socket.on("chat", (data) => {
  //     setMessageReceived(data)
  //   })

  // },[messageUpdated, createMessage])

  return (
    <div className='chatbox'>
      <div className='chatbox__header'>{channels[channelId]?.name}</div>
      <div className='chatbox__messages'>
        <ul className="chatbox__messages--list" style={{ listStyleType: "none" }}>
          {messages.map(message =>
            <li className="one-message" key={`message-${message.id}`}>
              <MessageContent message={message} setUpdateComplete={setUpdateComplete} setOnDelete={setOnDelete} />
            </li>
          )}
        </ul>
      </div>
      <div className='chatbox__input'>
        <MessageInput setMessageReceived={setMessageReceived} setCreateMessage={setCreateMessage} />
      </div>
    </div>
  );
}


export default ChatBox;
