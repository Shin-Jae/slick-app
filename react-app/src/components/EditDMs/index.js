import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditDMModalForm from "./EditDMs";

const EditDMModal = ({ channelId }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)}>Edit DM</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditDMModalForm onClose={() => setShowModal(false)} channelId={channelId} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default EditDMModal
