import { Modal } from "../../context/modal";
import React, { useState } from "react";
import CreateChannelForm from "../ChannelForm";

const CreateChannelModal = ({ hoverDisplay }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className={hoverDisplay ? 'button__create-channel' : 'button__create-channel--hidden'}
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}>
        <span class="material-symbols-outlined">add</span>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateChannelForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  )
}

export default CreateChannelModal