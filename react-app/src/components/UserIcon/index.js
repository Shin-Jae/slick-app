import './UserIcon.css'

const UserIcon = ({ members }) => {
  if (members.length <= 2) {
    return (
      <figure
        className='dm__icon'
        style={{ backgroundImage: `url( ${members[1]?.profile_img})` }}
      />
    );
  } else {
    return (
      <div className='dm__icon-container'>
        <figure
          className='dm__icon'
          style={{ backgroundImage: `url( ${members[1]?.profile_img})` }}
        />
        <div className='dm__icon--length'>{members.length - 1}</div>
      </div>
    );
  }
}

export default UserIcon;
