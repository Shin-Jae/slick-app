import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import { useState, useEffect } from 'react'
import { createNewMessage } from '../../store/messages';
import './MessageInput.css'
// import { io } from 'socket.io-client';

// let socket;

const MessageInput = ({setMessageReceived, setCreateMessage}) => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages)

  const { userId, channelId } = useParams()

  const [message, setMessage] = useState('')
  const [newMessageId, setNewMessageId] = useState('')

  if (!channels[channelId]) return null;

  const { name, members, private_chat } = channels[channelId]

  let privateMembers;

  if (channels[channelId]?.private_chat) {
    privateMembers = channels[channelId].members.filter(user =>
      +user.id !== +userId
    ).map(user => `${user.first_name} ${user.last_name}`).join(', ')
  }

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

    if (newMessage) {
      setNewMessageId(newMessage.id)
    }

    // socket.emit("chat", payload);
    setCreateMessage(payload)
    setMessage('');
  }

  return (
    <div className='message__input--container'>
      <form className='message__form' onSubmit={handleSubmit}>
        <input
          className='message__input'
          type='text'
          placeholder={private_chat ? `Message ${privateMembers}` : `Message #${name}`}
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
