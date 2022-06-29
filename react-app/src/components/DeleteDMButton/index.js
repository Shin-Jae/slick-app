import './DeleteDMButton.css'
import { useState } from 'react'

const DeleteDMButton = ({ channelId, showDelete }) => {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async (channelId) => {
    // console.log(channelId)
    let deletedDM;

    // try {
    //   deletedDM = await dispatch(deleteDM(channelId))
    // } catch (error) {
    //   alert(error)
    // }

    // if (deletedDM) {
    //   setDeleted(true)
    //   resetState()
    // }
  }

  const resetState = () => {
    setDeleted(false)
  }

  return (
      <div
      style={showDelete ? { display: 'block' } : { display: 'none' }}
      className='dms__list-item--delete-container'>
        <button
          onClick={() => handleDelete(channelId)}
          >X</button>
      </div>
  );
}

export default DeleteDMButton;