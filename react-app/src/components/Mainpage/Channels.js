import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import ChatBox from "../ChatBox";
import './Channels.css'
import DMs from '../DMs';
import UserChannels from '../UserChannels';
import { FaLinkedin, FaPython, FaReact, FaAws } from "react-icons/fa";
import { DiPostgresql } from "react-icons/di";
import { SiFlask } from "react-icons/si";

function Channels() {
  const { userId, channelId } = useParams();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getAllChannels(userId));
    if (channelId) {
      dispatch(getAllMessages(userId, channelId))
    }
  }, [dispatch, userId, channelId]);

  if (!Object.keys(allUsers).length) return null;
  // check
  return (
    <div className='main-display'>
      <div className='main-display__sidebar'>
        <div className='sidebar__top'>
          <div className='sidebar__info'>
            <ul>
              <li className='sidebar__info-item'>
                <FaPython className='tech__icons' style={{fontSize: '1.5em'}}/>
                <p className='sidebar__info-text'>Python</p>
              </li>
              <li className='sidebar__info-item'>
                <FaReact className='tech__icons' style={{fontSize: '1.5em'}}/>
                <p className='sidebar__info-text'>React</p>
              </li>
              <li className='sidebar__info-item'>
                <FaAws className='tech__icons' style={{fontSize: '1.5em'}}/>
                <p className='sidebar__info-text'>AWS</p>
              </li>
              <li className='sidebar__info-item'>
                <DiPostgresql className='tech__icons' style={{fontSize: '1.5em'}}/>
                <p className='sidebar__info-text'>PostgreSQL</p>
              </li>
              <li className='sidebar__info-item'>
                <SiFlask className='tech__icons' style={{fontSize: '1.5em'}}/>
                <p className='sidebar__info-text'>Flask</p>
              </li>
            </ul>
          </div>
          <div className='underline' />
          <UserChannels />
          <DMs />
        </div>
        <div className='sidebar__footer'>
          <div className='footer__header'>
            <span className="material-symbols-outlined">
              chat
            </span>
            <p>Developers</p>
          </div>
          <div className='underline__footer' />
          <a href='https://www.linkedin.com/in/jae-shin-5b3802128/' target="_blank">
            <div className='linked__in'>
              <FaLinkedin className='linkedin__icon' />
              <p>Jae Shin</p>
            </div>
          </a>
          <a href='https://www.linkedin.com/in/dayton-chen-0abb7abb/' target="_blank">
            <div className='linked__in'>
              <FaLinkedin className='linkedin__icon' />
              <p>Dayton Chen</p>
            </div>
          </a>
          <a href='https://www.linkedin.com/in/walker-adkins-50173a245/' target="_blank">
            <div className='linked__in'>
              <FaLinkedin className='linkedin__icon' />
              <p>Walker Adkins</p>
            </div>
          </a>
        </div>
      </div>
      <div className='main-display__chatbox'>
        {channelId && <ChatBox />}
      </div>
    </div >
  )
}

export default Channels;
