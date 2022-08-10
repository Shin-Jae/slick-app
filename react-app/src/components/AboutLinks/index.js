import './AboutLinks.css'
import { FaGithubSquare } from 'react-icons/fa'

const AboutLinks = () => {
  return (
    <div className='about__links--container'>

      <a className='about__links--text' href='https://www.github.com/Shin-Jae' target="_blank">
        <FaGithubSquare className='github__icon' color={'rgb(51, 51, 51)'}/>
        Jae Shin
      </a>
      <a className='about__links--text' href='https://www.github.com/spursforever' target="_blank">
        <FaGithubSquare className='github__icon' color={'rgb(51, 51, 51)'}/>
        Dayton Chen
      </a>
      <a className='about__links--text' href='https://www.github.com/walkeradkins' target="_blank">
        <FaGithubSquare className='github__icon' color={'rgb(51, 51, 51)'}/>
        Walker Adkins
      </a>
    </div>
  );
}

export default AboutLinks;