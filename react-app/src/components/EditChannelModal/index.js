import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditChannelForm from "../EditChannel";

const EditChannelModal = ({ userId, channelId, owner_id }) => {
    
    console.log("userId:", userId )
    console.log("owner_id:", owner_id)
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {userId === owner_id && (<button onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }} >Edit Channel</button>)}
            {showModal && (
                <Modal closeModal={() => setShowModal(false)} >
                    <EditChannelForm  closeModal={() => setShowModal(false)} channelId={channelId} />
                </Modal>
            )}

        </>
    )
}

export default EditChannelModal