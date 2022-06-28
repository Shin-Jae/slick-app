import { Modal } from "../../context/modal";
import React, {useState} from "react";
import CreateChannelForm from "../ChannelForm";

const CreateChannelModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>             
                <button onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>Create Channel</button>                
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreateChannelForm onClose={() => setShowModal(false)} />
        </Modal>
        )}        
        </>
    )
}

export default CreateChannelModal