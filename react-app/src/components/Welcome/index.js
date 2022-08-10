import './Welcome.css'
import chat2 from '../../images/chat2.jpg'
import ChatBox from '../ChatBox'


const Welcome = ({ props }) => {
  return (
    <>
      <div className='welcome__container'>
        <img
          className='chat__png'
          alt=''
          src={chat2} />
        <div className='welcome__text-container'>
          <p className='welcome__header'>Getting started with Slick</p>
          <p><span className='bold'>This is your space.</span> Draft messages, list your to-dos, or jot down some notes. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.</p>
        </div>
      </div>
    </>
  );
}

export default Welcome;