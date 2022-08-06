import './UserIcon.css'

const UserIcon = ({ members }) => {

  if (members.length <= 2) {
    return (
      <>
        {members[1]?.profile_img ?
          <figure
            className='dm__icon'
            style={{ backgroundImage: `url( ${members[1]?.profile_img})` }}
          /> :
          <div className='default-members dm__icon'>
            {members[1]?.first_name[0]}
          </div>
        }
      </>
    );
  } else {
    return (
      <div className='dm__icon-container'>
        {members[1]?.profile_img ?
          <>
            <figure
              className='dm__icon'
              style={{ backgroundImage: `url( ${members[1]?.profile_img})` }}
            />
            <div className='dm__icon--length'>{members.length - 1}</div>
          </>
          : <>
            <div className='default-members dm__icon'>
              {members[1]?.first_name[0]}
            </div>
            <div className='dm__icon--length'>{members.length - 1}</div>
          </>}
      </div>
    );
  }
}

export default UserIcon;
