import './MessageUserIcon.css'

const MessageUserIcon = ({ memberImage }) => {
  return (
    <figure
        className='message__icon--user'
        style={{ backgroundImage: `url( ${memberImage})` }}
      />
   );
}

export default MessageUserIcon;