import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import { useState, useEffect } from 'react'
import { createNewMessage } from '../../store/messages';
import { io } from 'socket.io-client';

let socket;

const MessageInput = () => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels)
  const { userId, channelId } = useParams()

  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState([])

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);


  useEffect(() => {
    socket = io();
    socket.on("chat", (chat) => {
      setMessageReceived(chat)
      console.log(messageReceived)
    })
    return (() => {
      socket.disconnect()
    })
  }, [])

  if (!channels[channelId]) return null;

  const { name } = channels[channelId]


  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      content: message,
      owner_id: userId,
      channel_id: channelId,
      created_at: new Date(),
      updated_at: new Date()
    }

    let newMessage;
    try {
      newMessage = await dispatch(createNewMessage(payload));
    } catch (error) {
      alert(error)
    }
    // socket = io();
    // socket.on("chat")
    socket.emit("chat", payload);
    setMessage('')
  }


  return (
    <div className='message__container'>
      <form className='message__form' onSubmit={handleSubmit}>
        <input
          className='message__input'
          type='text'
          placeholder={`Message #${name}`}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='btn' disabled={!message}>Send</button>
      </form>
    </div>
  );
}

export default MessageInput;
