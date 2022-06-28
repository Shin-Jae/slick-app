import { Modal } from "../../context/modal";
import React, { useState } from "react";
import CreateDMForm from "./CreateDMsForm";

const CreateDMModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)}>Create DM</button>
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
