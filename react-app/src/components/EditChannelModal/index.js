import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditChannelForm from "../EditChannel";

const EditChannelModal = ({ channelId }) => {
    console.log("OOOOOOOOOOOOOOOOOOOOO", channelId)
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>Edit Channel</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannelForm onClose={() => setShowModal(false)} channelId={channelId} />
                </Modal>
            )}

        </>
    )
}

export default EditChannelModal