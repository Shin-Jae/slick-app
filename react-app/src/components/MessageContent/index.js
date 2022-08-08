import './MessageContent.css'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import { updateMessage, deleteMessage } from '../../store/messages';
import MessageUserIcon from '../MessageUserIcon';
import TextareaAutosize from 'react-textarea-autosize';



const MessageContent = ({ message, setUpdateComplete, setOnDelete, setMessageUpdated, setPrevMessage }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.search);
  const user = useSelector((state) => state.session.user)
  const [errors, setErrors] = useState([])
  const [originalContent, setOriginalContent] = useState(message.content)
  const [content, setContent] = useState(message.content)
  const [edit, setEdit] = useState(true)
  const [deleted, setDeleted] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [rowValue, setRowValue] = useState(5)
  const [textareaHeight, setTextareaHeight] = useState(message.content.length < 600 ?
    2 : message.content.length / 131);
  const [spaceCheck, setSpaceCheck] = useState(message.content.trim().length)

  useEffect(() => {
    const validationErrors = []
    if (content.length > 1999)
      validationErrors.push('Please keep message to under 2000 characters')
    setErrors(validationErrors)
  }, [content, dispatch])

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(!edit)
    setPrevMessage(message.content)
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    let deletedMessage;
    try {
      deletedMessage = await dispatch(deleteMessage(message.id));
    } catch (error) {
      alert(error)
    }

    if (deletedMessage) {
      setDeleted(true)
      setOnDelete(true)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const payload = {
      content: content.trim(),
      owner_id: message.owner_id,
      channel_id: message.channel_id,
      created_at: message.created_at,
      updated_at: new Date()
    }

    let updatedMessage;

    if (!errors.length) {
      try {
        updatedMessage = await dispatch(updateMessage(payload, message.id));
        setMessageUpdated(updatedMessage.content)
      } catch (error) {
        setErrors([])
      }
    }

    if (updatedMessage) {
      setEdit(true);
      setOriginalContent(updatedMessage.content);
      setUpdateComplete(updatedMessage)
      setContent(updatedMessage.content)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setEdit(true)
    setContent(message.content)
  }

  const handleChange = (e) => {
    setContent(e.target.value)
    setSpaceCheck(e.target.value.trim().length)
    let value = e.target.value.length
    let trows = Math.ceil(value / 140) - 1;
    if (trows > rowValue) {
      setTextareaHeight(textareaHeight + 1);
      setRowValue(trows);
    }

    if (trows < rowValue) {
      setTextareaHeight(Math.ceil(value / 120));
      setRowValue(trows);
      if (!trows) trows = 5;
    }
  }

  const handleKeyPress = (e) => {
    if (e.target.value.length <= 1999) {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSave(e);
      }
    }
  };
  console.log(message.image)
  // const timeString = message.created_at.slice(17, 25)
  const time = new Date(message.created_at)

  const convertedTimeString = time.toLocaleTimeString('en-US',
    { hour12: true, hour: 'numeric', minute: 'numeric' });
  return (
    <div
      className={edit ? 'message__container' : 'message__container--edit'}
      onMouseEnter={() => setShowTools(true)}
      onMouseLeave={() => setShowTools(false)}
    >
      {errors[0] &&
        <div className='error__container'>
          <p className='error__text'>{`${errors}`}</p>
        </div>}
      <div className='message__icon--name'>
        <MessageUserIcon memberImage={allUsers[message.owner_id].profile_img} first_letter={allUsers[message.owner_id].first_name[0]} />
        <p className='message__user--name'>{allUsers[message.owner_id].first_name} {allUsers[message.owner_id].last_name}</p>
        <p className='message__user--time'>{convertedTimeString}</p>
      </div>
      <form>
        <div className={edit ? 'message__textarea--container--inactive' : 'message__textarea--container'}>
          <TextareaAutosize
            minRows={2}
            maxLength='2000'
            className={edit ? 'input__inactive' : 'input__active'}
            value={content}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            disabled={edit}
          />
          {edit && <div className='message-image-container'>
            <img className='message-image' src={message.image} alt="" />
          </div>}
          {user.id === message.owner_id && edit && showTools &&
            <div className='message__tools--container'>
              {user.id === message.owner_id &&
                <button
                  className='message__tools-btn'
                  onClick={handleEdit}
                  type='submit'>
                  <span
                    className="material-symbols-outlined message__tools--tool-icons">
                    edit
                  </span>
                </button>}
              {user.id === message.owner_id &&
                <button
                  className='message__tools-btn'
                  onClick={handleDelete}
                  type='submit'>
                  <span
                    className="material-symbols-outlined message__tools--tool-icons">
                    delete
                  </span>
                </button>}
            </div>
          }
          {!edit &&
            <div className='message__edits--container'>
              {user.id === message.owner_id &&
                <button
                  disabled={!spaceCheck}
                  className={spaceCheck ?
                    'message__edit--btn message__edit--btn-save' :
                    'btn__disabled message__edit--btn'}
                  onClick={handleSave} type='submit'>
                  Save
                </button>}
              {user.id === message.owner_id &&
                <button
                  className='message__edit--btn message__edit--btn-cancel'
                  onClick={handleCancel}
                  type='submit'>
                  Cancel
                </button>}
            </div>
          }
        </div>
      </form>
    </div>
  );
}

export default MessageContent;
