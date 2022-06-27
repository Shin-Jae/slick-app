import './MessageContent.css'
import MessageInput from '../MessageInput/';
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react'
import { updateMessage } from '../../store/messages';

const MessageContent = ({ message }) => {
  const dispatch = useDispatch();
  const allMessages = useSelector((state) => state.messages);
  const allUsers = useSelector((state) => state.search);
  const user = useSelector((state) => state.session.user)
  const [originalContent, setOriginalContent] = (message.content)
  const [content, setContent] = useState(message.content)
  const [edit, setEdit] = useState(true)


  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(!edit)
  }

  const handleDelete = (e) => {
    e.preventDefault()
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const payload = {
      content,
      owner_id: message.owner_id,
      channel_id: message.channel_id,
      created_at: message.created_at,
      updated_at: new Date()
    }

    let updatedMessage;
    try {
      updatedMessage = await dispatch(updateMessage(payload, message.id));
    } catch (error) {
      alert(error)
    }

    if (updateMessage) {
      setEdit(true)
    }
  }


  const handleCancel = (e) => {
    e.preventDefault()
    setEdit(true)
  }

  return (
    <>
      <p>{allUsers[message.owner_id].first_name} {allUsers[message.owner_id].last_name}: </p>
      <form>
        <input
          className={edit ? 'input__inactive' : 'input__active'}
          // placeholder={`${message.content}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={edit}
        />
        {edit &&
          <div>
            {user.id === message.owner_id && <button className='btn' onClick={handleEdit} type='submit'>Edit</button>}
            {user.id === message.owner_id && <button onClick={handleDelete} type='submit'>Delete</button>}
          </div>
        }
        {!edit &&
          <div>
            {user.id === message.owner_id && <button className='btn' onClick={handleSave} type='submit'>Save</button>}
            {user.id === message.owner_id && <button onClick={handleCancel} type='submit'>Cancel</button>}
          </div>
        }
      </form>
    </>
  );
}

export default MessageContent;