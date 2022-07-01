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

const MessageInput = ({ setMessageReceived, setCreateMessage }) => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages)
  const [rowValue, setRowValue] = useState(5)
  const [spaceCheck, setSpaceCheck] = useState(0)
  const { userId, channelId } = useParams()
  const [textareaHeight, setTextareaHeight] = useState(1);
  const [message, setMessage] = useState('')
  const [newMessageId, setNewMessageId] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const validationErrors = []
    if (message.length >= 1999)
      validationErrors.push('Please keep message to under 2000 characters')
    setErrors(validationErrors)
  }, [message, dispatch])

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
      content: message.trim(),
      owner_id: userId,
      channel_id: channelId,
      created_at: new Date(),
      updated_at: new Date()
    }

    let newMessage;

    if (!errors.length) {
      try {
        newMessage = await dispatch(createNewMessage(payload));
      } catch (error) {
        setErrors([])
      }
    }

    if (newMessage) {
      setNewMessageId(newMessage.id);
      setTextareaHeight(1);
      setErrors([])
    }

    // socket.emit("chat", payload);
    setCreateMessage(payload)
    setMessage('');
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
    setSpaceCheck(e.target.value.trim().length)
    let value = e.target.value.length
    let trows;
    if (value < 140) {
      trows = 2;
      setTextareaHeight(1)
    } else {
      trows = Math.ceil(value / 140);
    }
    if (trows > rowValue) {
      setTextareaHeight(textareaHeight + 1);
      setRowValue(trows);
    }

    if (trows < rowValue) {
      setTextareaHeight(Math.ceil(value / 120));
      setRowValue(trows);
      if (!trows) trows = 2;
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className='message__input--container'>
      {errors[0] &&
        <div className='message__error'>
          <p className='error__text'>{`${errors}`}</p>
        </div>}

        <form className='message__form' onSubmit={handleSubmit}>
          <textarea
            className='message__input'
            type='text'
            placeholder={private_chat ? `Message ${privateMembers}` : `Message #${name}`}
            onKeyPress={handleKeyPress}
            maxLength='2000'
            rows={textareaHeight}
            value={message}
            onChange={handleChange}
          // onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className={
              message.trim().length &&
                message.length <= 1999 ?
                'message__input--btn message__input--btn-active' :
                'message__input--btn btn__disabled'}
            disabled={!message.trim().length || message.trim().length >= 1999}>
            <span
              class="material-symbols-outlined">
              send
            </span>
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default MessageInput;
