import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import { useState, useEffect } from 'react'

const MessageInput = () => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels)
  const { userId, channelId } = useParams()
  const { description, id, members, name, owner_id } = channels[channelId]

  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getAllChannels(userId));
    dispatch(getAllMessages(userId, channelId))
  }, [dispatch, userId, channelId]);

  console.log('channels :: ', channels)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
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
