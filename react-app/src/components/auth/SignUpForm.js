import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css';
import './SignUpForm.css';
import slickicon from "../../images/slickicon.png"
import AboutLinks from '../AboutLinks';
import { createChannels, createOneChannel } from '../../store/channels'
import { PropagateLoader } from 'react-spinners'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [channel, setChannel] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_img, setProfileImg] = useState('');
  // const [imageProfile, setImageProfile] = useState("");
  // const [pickedImage, setPickedImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);
  const [choseImage, setChoseImage] = useState(false);

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  // let pictures = ["%curious%george%with%cool%binoculars%", "%courage%the%cowardly%dog", "%storm%trooper%", "%ninja%with%kunai%", "%happy%minion%looking%up%", "5%sleeping%koala%on%branch%", ""]


  const onSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = []
    if (!first_name)
      validationErrors.push("Please provide your first name")
    if (!last_name)
      validationErrors.push("Please provide your last name")
    if (!email)
      validationErrors.push("Please enter your email")
    if (!password)
      validationErrors.push("Please enter password")
    if (!repeatPassword)
      validationErrors.push("Please re-enter password")
    if (password !== repeatPassword) validationErrors.push("Passwords field must match repeat password field.")
    // if (!imageProfile)
    //   validationErrors.push("Please choose your favorite avatar")

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_img", profile_img)
    const data = {}

    if (password === repeatPassword) {
      await dispatch(signUp(formData))
        .then(user => {
          data['user'] = user.id
          return dispatch(createOneChannel(user.id, {
            name: `${user.first_name} ${user.last_name}`,
            description: 'A private channel for you',
            private_chat: true,
            owner_id: user.id,
            members: [user.id]
          }))
        })
        .then((channel) => {
          data['channel'] = channel.id;
          history.push(`/users/${data.user}`);
        })
      setLoading(false)
    };

  }
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

  const updateImage = (e) => {
    const file = e.target.files[0];
    setChoseImage(true)
    setProfileImg(file);
  }

  const override = {
    display: "block",
    margin: "0 auto",
  };

  if (loading) {
    return (
      <div className='loader__wrapper'>
        <div className='loader__content'>
          <div className='loader__text'>
            <p className='loader__header'>👋 Welcome!</p>
            <p className='loader__subheader'>Please wait while we create your account</p>
          </div>
          <div className='loader__loader'>
            <PropagateLoader
              color={'#f91690'}
              cssOverride={override}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container-login-page'>
      <header className='container-login-header'>
        <div className='header-left-col'></div>
        <NavLink exact to="/" className='header-center-col'></NavLink>
        <div className='header-right-col'>
          <div className='link-to-other-form'>
            Already have an account?
          </div>
          <div><NavLink to="/">Sign in instead</NavLink></div>
        </div>
      </header>
      <div className='text-sign-in'>
        <h1>Join <span className='text-sign-in-slick'>Slick</span> today</h1>
        <p className='text-sign-in-suggest'>We suggest using the email address you use at work</p>
        <img
          className='slick-logo3'
          alt=''
          src={slickicon} />
      </div>
      <form onSubmit={onSignUp} className='form-container'>
        {errors[0] &&
          <div className='error__container'>
            {errors.map((error, ind) => (
              <p key={ind} className='error__text'>{error}</p>
            ))}
          </div>}
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            required
            name='first_name'
            onChange={updateFirstName}
            value={first_name}
            placeholder='Your first name'
          ></input>
        </div>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='last_name'
            required
            onChange={updateLastName}
            value={last_name}
            placeholder='Your last name'
          ></input>
        </div>
        <div className='input'>
          <input
            className='login-input-field'
            type='text'
            name='email'
            required
            onChange={updateEmail}
            value={email}
            placeholder='Your email'
          ></input>
        </div>
        <div className='input'>
          <input
            className='login-input-field'
            type='password'
            required
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Please enter a password'
          ></input>
        </div>
        <div className='input'>
          <input
            className='login-input-field'
            type='password'
            required
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            placeholder='Confirm password'
          ></input>
        </div>
        <div className='profile-img-container'>
          <label className='choose-profile-img'>
            <div className='img-btn-container'>
              <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                hidden
              /></div>
            <span className='upload-profile-img'>Upload profile image</span>

          </label>
          {choseImage &&
            <div className='selected-img'>
              <span className="iconify check-icon" data-icon="akar-icons:circle-check-fill"></span>
            </div>
          }
        </div>
        {(imageLoading) && profile_img && <p className='profile-loading'>Loading...</p>}
        {/* <div className='input'>
          <input
            className='login-input-field'
            type='hidden'
            name='profile_img'
            onChange={updateProfileImg}
            value={!imageProfile ? profile_img : imageProfile}
            placeholder="Add profile image or pick one from below"
          >
          </input> */}
        {/* <button
            className='hide-profile-img-btn'
            onClick={hideImg}
            type="button"
          >{show ? "Close" : "Pick Here"}</button> */}
        {/* {show ? */}
        {/* <div className='container-signup-profile-img form-container'>
            <span onClick={profileImg1}><img
              src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.wallpapersafari.com%2F40%2F92%2FuDb8Ag.jpg&f=1&nofb=1"}
              alt="1"
              className={pickedImage === 'profileImg1' ? 'signup-profile-img picked__img' : 'signup-profile-img'}
            />
            </span>
            <span onClick={profileImg2}>
              <img
                src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8tdN9Y1EdqHqjxJKNaM8fgHaEK%26pid%3DApi&f=1"}
                alt="2"
                className={pickedImage === 'profileImg2' ? 'signup-profile-img picked__img' : 'signup-profile-img'}
              />
            </span>
            <span onClick={profileImg3}>
              <img
                src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FoDrAACvIhot0pCtrxiTVgAAAA%26pid%3DApi&f=1"}
                alt="3"
                className={pickedImage === 'profileImg3' ? 'signup-profile-img picked__img' : 'signup-profile-img'}
              />
            </span>
            <span onClick={profileImg4}>
              <img
                src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ufGaAO3SS0Cc387fjLkt8gHaHa%26pid%3DApi&f=1"}
                alt="4"
                className={pickedImage === 'profileImg4' ? 'signup-profile-img picked__img' : 'signup-profile-img'}
              />
            </span>
            <span onClick={profileImg5}>
              <img
                src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.utwjOzxNcqOu7nG40Wx2kQHaEo%26pid%3DApi&f=1"}
                alt="5"
                className={pickedImage === 'profileImg5' ? 'signup-profile-img picked__img' : 'signup-profile-img'}
              />
            </span>
            <span onClick={profileImg6}>
              <img
                src={"https://cdn.dribbble.com/users/1044993/screenshots/7144312/media/aad1fc1a4ec6d1c27e486c04c1a820b9.png"}
                alt="6"
                className={pickedImage === 'profileImg6' ? 'signup-profile-img picked__img' : 'signup-profile-img'}
              />
            </span>
          </div>
        </div> */}
        <button type='submit' className='login-btn'>Sign Up</button>
        <AboutLinks />
      </form>
    </div>
  );
};

export default SignUpForm;
