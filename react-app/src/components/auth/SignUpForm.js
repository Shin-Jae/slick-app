import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_img, setProfileImg] = useState('');
  const [show, setShow] = useState(false);
  const [imageProfile, setImageProfile] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let pictures = ["%curious%george%with%cool%binoculars%", "%courage%the%cowardly%dog", "%storm%trooper%", "%ninja%with%kunai%", "%happy%minion%looking%up%", "5%sleeping%koala%on%branch%", ""]

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, email, password, profile_img));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfileImg = (e) => {
    setProfileImg(e.target.value);
  }

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }


  const profileImg1 = () => {
    if (profile_img && imageProfile !== pictures[0]) {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F40%2F92%2FuDb8Ag.jpg&f=1&nofb=1")
      setImageProfile(pictures[0]);
    } else if (imageProfile === pictures[0]) {
      setProfileImg("")
      setImageProfile(pictures[6]);
    } else {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F40%2F92%2FuDb8Ag.jpg&f=1&nofb=1")
      setImageProfile(pictures[0]);
    }
  }

  const profileImg2 = () => {
    if (profile_img && imageProfile !== pictures[1]) {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8tdN9Y1EdqHqjxJKNaM8fgHaEK%26pid%3DApi&f=1")
      setImageProfile(pictures[1])
    } else if (imageProfile === pictures[1]) {
      setProfileImg("")
      setImageProfile(pictures[6]);
    } else {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8tdN9Y1EdqHqjxJKNaM8fgHaEK%26pid%3DApi&f=1")
      setImageProfile(pictures[1])
    }
  }

  const profileImg3 = () => {
    if (profile_img && imageProfile !== pictures[2]) {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FoDrAACvIhot0pCtrxiTVgAAAA%26pid%3DApi&f=1")
      setImageProfile(pictures[2])
    } else if (imageProfile === pictures[2]) {
      setProfileImg("")
      setImageProfile(pictures[6]);
    } else {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FoDrAACvIhot0pCtrxiTVgAAAA%26pid%3DApi&f=1")
      setImageProfile(pictures[2])
    }
  }

  const profileImg4 = () => {
    if (profile_img && imageProfile !== pictures[3]) {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ufGaAO3SS0Cc387fjLkt8gHaHa%26pid%3DApi&f=1")
      setImageProfile(pictures[3])
    } else if (imageProfile === pictures[3]) {
      setProfileImg("")
      setProfileImg()
      setImageProfile(pictures[6]);
    } else {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ufGaAO3SS0Cc387fjLkt8gHaHa%26pid%3DApi&f=1")
      setImageProfile(pictures[3])
    }
  }

  const profileImg5 = () => {
    if (profile_img && imageProfile !== pictures[4]) {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.utwjOzxNcqOu7nG40Wx2kQHaEo%26pid%3DApi&f=1")
      setImageProfile(pictures[4])
    } else if (imageProfile === pictures[4]) {
      setProfileImg("")
      setImageProfile(pictures[6]);
    } else {
      setProfileImg("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.utwjOzxNcqOu7nG40Wx2kQHaEo%26pid%3DApi&f=1")
      setImageProfile(pictures[4])
    }
  }

  const profileImg6 = () => {
    if (profile_img && imageProfile !== pictures[5]) {
      setProfileImg("https://cdn.dribbble.com/users/1044993/screenshots/7144312/media/aad1fc1a4ec6d1c27e486c04c1a820b9.png")
      setImageProfile(pictures[5])
    } else if (imageProfile === pictures[5]) {
      setProfileImg("")
      setImageProfile(pictures[6]);
    } else {
      setProfileImg("https://cdn.dribbble.com/users/1044993/screenshots/7144312/media/aad1fc1a4ec6d1c27e486c04c1a820b9.png")
      setImageProfile(pictures[5])
    }
  }

  function hideImg() {
    setShow(!show);
  }

  return (
    <div className='container-login-page'>
      <header className='container-login-header'>
        <div className='header-left-col'></div>
        <NavLink exact to="/" className='header-center-col'>slick</NavLink>
        <div className='header-right-col'>
          Already have an account?
          <div><NavLink to="/login">Sign in instead</NavLink></div>
        </div>
      </header>
      <div className='text-sign-in'>
        <h1>Join <span className='text-sign-in-slick'>Slick</span> today</h1>
        <p className='text-sign-in-suggest'>We suggest using the email address you use at work</p>
      </div>
      <form onSubmit={onSignUp} className='form-container'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>First Name</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='first_name'
            onChange={updateFirstName}
            value={first_name}
            placeholder='Your first name'
          ></input>
        </div>
        <label>Last Name</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='last_name'
            onChange={updateLastName}
            value={last_name}
            placeholder='Your last name'
          ></input>
        </div>
        <label>Email</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Your email'
          ></input>
        </div>
        <label>Password</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Please enter a password'
          ></input>
        </div>
        <label>Repeat Password</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Confirm password'
          ></input>
        </div>
        <label>Profile Image</label>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='profile_img'
            onChange={updateProfileImg}
            value={!imageProfile ? profile_img : imageProfile}
            placeholder="Add profile image or pick one from below"
          >
          </input>
          <button
            className='hide-profile-img-btn'
            onClick={hideImg}
            type="button"
          >{show ? "Close" : "Pick Here"}</button>
          {show ?
            <div className='container-signup-profile-img form-container'>
              <span onClick={profileImg1}><img
                src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F40%2F92%2FuDb8Ag.jpg&f=1&nofb=1"}
                alt="1"
                className='signup-profile-img'
              />
              </span>
              <span onClick={profileImg2}>
                <img
                  src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8tdN9Y1EdqHqjxJKNaM8fgHaEK%26pid%3DApi&f=1"}
                  alt="2"
                  className='signup-profile-img'
                />
              </span>
              <span onClick={profileImg3}>
                <img
                  src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FoDrAACvIhot0pCtrxiTVgAAAA%26pid%3DApi&f=1"}
                  alt="3"
                  className='signup-profile-img'
                />
              </span>
              <span onClick={profileImg4}>
                <img
                  src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ufGaAO3SS0Cc387fjLkt8gHaHa%26pid%3DApi&f=1"}
                  alt="4"
                  className='signup-profile-img'
                />
              </span>
              <span onClick={profileImg5}>
                <img
                  src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.utwjOzxNcqOu7nG40Wx2kQHaEo%26pid%3DApi&f=1"}
                  alt="5"
                  className='signup-profile-img'
                />
              </span>
              <span onClick={profileImg6}>
                <img
                  src={"https://cdn.dribbble.com/users/1044993/screenshots/7144312/media/aad1fc1a4ec6d1c27e486c04c1a820b9.png"}
                  alt="6"
                  className='signup-profile-img'
                />
              </span>
            </div>
            : null}
        </div>
        <button type='submit' className='login-btn'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
