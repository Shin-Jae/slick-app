import './DeleteWarning.css'
import { AiFillWarning } from 'react-icons/ai'

const DeleteWarning = ({ type, setModalClose, handleDelete, id }) => {

  const handleFunction = () => {
    return id ? handleDelete(id) : handleDelete()
  }

  return (
    <div className='delete__modal'>
      <div className='delete__modal-header'>
        <AiFillWarning size={'2.5em'} color={'rgba(255, 64, 64, 0.7)'} />
        <p>Are you sure you want to delete this {type}?</p>
      </div>
      <div className='delete__modal-buttons'>
        <button className='delete__modal-confirm' onClick={handleFunction}>Yes, Delete</button>
        <button className='delete__modal-cancel' onClick={() => setModalClose(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteWarning;