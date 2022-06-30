import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditChannelForm from "../EditChannel";
import { useSelector } from "react-redux"

const EditChannelModal = ({ userId, channelId, owner_id }) => {
    const [showModal, setShowModal] = useState(false);

    const channels = useSelector((state) => state.channels[channelId].members)
    const set = new Set();
    for (const channel of channels) {
        set.add(channel['id']);
    }

    return (
        <>
            {userId === owner_id && (<button onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }} >Edit Channel</button>)}
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <EditChannelForm onClose={() => setShowModal(false)} showModal={showModal} channelId={channelId} set={set} />
                </Modal>
            )}

        </>
    )
}

export default EditChannelModal
