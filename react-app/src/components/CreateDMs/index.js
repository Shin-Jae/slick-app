import { Modal } from "../../context/modal";
import React, { useState } from "react";
import CreateDMForm from "./CreateDMsForm";

const CreateDMModal = ({ hoverDisplay }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <button
          className={hoverDisplay ? 'button__create-channel' : 'button__create-channel--hidden'}
          onClick={() => setShowModal(true)}
        >
          <span className="material-symbols-outlined">add</span>
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
