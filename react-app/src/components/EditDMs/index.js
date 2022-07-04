import { Modal } from "../../context/modal";
import React, { useState } from "react";
import EditDMModalForm from "./EditDMs";
import { useSelector } from "react-redux"

const EditDMModal = ({ channelId }) => {
    const [showModal, setShowModal] = useState(false);

    const channels = useSelector((state) => state.channels[channelId].members)
    const set = new Set();
    for (const channel of channels) {
        set.add(channel['id']);
    }
    return (
        <>
            <div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditDMModalForm onClose={() => setShowModal(false)} showModal={showModal} channelId={channelId} set={set} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default EditDMModal
