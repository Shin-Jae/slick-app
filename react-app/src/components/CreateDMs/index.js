import { Modal } from "../../context/modal";
import React, { useState } from "react";
import CreateDMForm from "./CreateDMsForm";

const CreateDMModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <button
          className='button__create-channel'
          onClick={() => setShowModal(true)}
        >
          <span class="material-symbols-outlined">add</span>
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateDMForm onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default CreateDMModal
