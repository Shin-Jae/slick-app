import './MessageUserIcon.css'

const MessageUserIcon = ({ memberImage, first_letter }) => {
  return (
    <>
      {memberImage ?
        <figure
          className='message__icon--user'
          style={{ backgroundImage: `url( ${memberImage})` }}
        />
        : <div className='default-profile message__icon--user'>
          {first_letter}
        </div>}
    </>
  );
}

export default MessageUserIcon;
