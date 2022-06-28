import './ChatBox.css'
import MessageInput from '../MessageInput/';
import { useSelector } from "react-redux";
import {useState} from 'react'
import MessageContent from '../MessageContent'

const ChatBox = () => {
  const allMessages = useSelector((state) => state.messages);
  const [edit, setEdit] = useState(true)

  const messages = Object.values(allMessages);

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(!edit)
  }

  const handleDelete = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <div>Messages</div>
      <ul className="messages" style={{ listStyleType: "none" }}>
        {messages.map(message =>
          <li className="one-message" key={`message-${message.id}`}>
           <MessageContent message={message} />
          </li>
        )}
      </ul>
      <MessageInput />
    </div>
  );
}


export default ChatBox;