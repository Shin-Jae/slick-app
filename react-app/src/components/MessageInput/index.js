import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { createNewMessage } from '../../store/messages';
import './MessageInput.css'
import ReactTooltip from "react-tooltip";
import TextareaAutosize from 'react-textarea-autosize';
import { BeatLoader } from 'react-spinners'
// import { io } from 'socket.io-client';

// let socket;

const MessageInput = ({ setUserTyping, setCreateMessage, setTyping, channelId }) => {
  const dispatch = useDispatch()
  const focusRef = useRef()
  const channels = useSelector((state) => state.channels);
  const user = useSelector(state => state.session.user);
  const { userId } = useParams()
  const [textareaHeight, setTextareaHeight] = useState(1);
  const [message, setMessage] = useState('')
  const [newMessageId, setNewMessageId] = useState('')
  const [errors, setErrors] = useState([])
  const data = useParams();
  const [selfChat, setSelfChat] = useState('channelId' in data)
  const [image, setImage] = useState(null);
  // console.log("O<AGE", image)
  const [imageLoading, setImageLoading] = useState(false);
  const [choseImage, setChoseImage] = useState(false);

  useEffect(() => {
    const validationErrors = []
    if (message.length > 1999)
      validationErrors.push('Please keep message to under 2000 characters')
    setErrors(validationErrors)
    focusRef.current.focus();
  }, [message, dispatch, channelId])

  if (!channels[channelId]) return null;

  const { name, private_chat } = channels[channelId]

  let privateMembers;

  if (channels[channelId]?.private_chat) {
    privateMembers = channels[channelId].members.filter(user =>
      +user.id !== +userId
    ).map(user => `${user.first_name} ${user.last_name}`).join(', ')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log('message', message)
    const formData = new FormData();
    if (message) formData.append("content", message.trim());
    formData.append("owner_id", userId);
    formData.append("channel_id", channelId);
    formData.append("image", image);
    formData.append("created_at", new Date());
    formData.append("updated_at", new Date());

    setImageLoading(true);

    let newMessage;

    if (!errors.length) {
      try {
        newMessage = await dispatch(createNewMessage(formData));
      } catch (error) {
        setImageLoading(false);
        setErrors([])
      }
    }

    if (newMessage) {
      setTyping(false)
      setUserTyping('')
      setNewMessageId(newMessage.id);
      setImageLoading(false);
      setImage(null);
      setChoseImage(false);
      setTextareaHeight(1);
      setErrors([])
    }

    setCreateMessage(formData)
    setChoseImage(false);
    setMessage('');
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setChoseImage(true)
    setImage(file);
  }

  const handleKeyPress = (e) => {
    if (e.target.value.length <= 1999) {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
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
          <TextareaAutosize
            className='message__input'
            type='text'
            placeholder={
              !selfChat ?
                `Jot something down` :
                (private_chat ? `Message ${privateMembers}` : `Message #${name}`)}
            onKeyPress={handleKeyPress}
            maxLength='2000'
            minRows={3}
            ref={focusRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='add-img-container'>
            {choseImage && !imageLoading &&
              <div className='selected-img'>
                <span className="iconify" data-icon="akar-icons:circle-check-fill"></span>
                <span>{image?.name}</span>
              </div>
            }
            {(imageLoading) &&
              image &&
              <span className='loading'>Loading Image
                <BeatLoader color={'#f91690'} />
              </span>
            }
          </div>
          <div className='message__button-container'>
            <div className='top__buttons'>
              <div
                className='clear__input'
                data-tip data-for="clear__tip"
                onClick={() => setMessage('')}
              >
                <span className="material-symbols-outlined">
                  clear_all
                </span>
              </div>
              <ReactTooltip id="clear__tip" place="top" effect="solid">
                Clear Input
              </ReactTooltip>
              <label className='choose-image'>
                <div className=''>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                    hidden
                  /></div>
                <ReactTooltip id="photo__tip" place="top" effect="solid">
                  Click to attach a photo
                </ReactTooltip>
                <div className='plus-sign' data-tip data-for="photo__tip">
                  <span className="material-symbols-outlined add__image-input">
                    image
                  </span>
                </div>
              </label>
            </div>
            <button
              type='submit'
              className={
                (message.trim().length &&
                  message.length <= 1999)
                  || image
                  ?
                  'message__input--btn message__input--btn-active' :
                  'message__input--btn btn__disabled'}
              disabled={(!message.trim().length || message.trim().length > 1999) && image === null}
            >
              <span
                className="material-symbols-outlined">
                send
              </span>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MessageInput;
