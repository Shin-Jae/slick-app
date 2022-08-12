import './DeleteDMButton.css'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel } from '../../store/channels';
import { getAllChannels } from '../../store/channels';
import { getAllMessages } from '../../store/messages';
import { Modal } from '../../context/modal'
import DeleteWarning from '../DeleteWarning'

const DeleteDMButton = ({ currentChannelId, showDelete }) => {
  const { channelId } = useParams()
  const dispatch = useDispatch()
  const [warning, setWarning] = useState(false)
  const history = useHistory();
  const [deleted, setDeleted] = useState(false)
  const logInId = useSelector((state) => state.session.user.id)

  useEffect(() => {
    dispatch(getAllChannels(logInId));
    if (currentChannelId) {
      dispatch(getAllMessages(logInId, currentChannelId))
    }
  }, [dispatch, deleted]);

  const handleDelete = async (currentChannelId) => {

    let deletedDM;

    try {
      deletedDM = await dispatch(deleteChannel(currentChannelId))
    } catch (error) {
      alert(error)
    }

    if (deletedDM) {
      if (deletedDM.id === parseInt(channelId)) {
        history.push(`/users/${logInId}`)
      }

      setDeleted(true)
      resetState()
    }
  }

  const resetState = () => {
    setDeleted(false)
  }

  return (
    <div
      style={showDelete ? { display: 'block' } : { display: 'none' }}
      className='dms__list-item--delete-container'>
      <button
        className='deleteDM__button'
        onClick={() => setWarning(true)}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      {warning &&
        <Modal onClose={() => setWarning(false)}>
          <DeleteWarning
            type={'direct message'}
            setModalClose={setWarning}
            handleDelete={handleDelete}
            id={currentChannelId}
          />
        </Modal>}
    </div>
  );
}

export default DeleteDMButton;
