import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateChannel, getAllChannels } from "../../store/channels"


const EditChannelForm = ({ closeModal, channelId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const channel = useSelector((state) => state.channels[channelId])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const privatechat = false
    const userId = useSelector((state) => state.session.user.id)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const validationErrors = []
        if (!name)
            validationErrors.push("Please enter a channel name")
        if (name.length > 100)
            validationErrors.push('Channel Name must be 100 characters or less')
        if (!description)
            validationErrors.push("Please enter channel's description")
        if (description.length > 255)
            validationErrors.push("Channel Description must be 255 characters or less")
        setErrors(validationErrors)
    }, [name, description, dispatch])

    useEffect(() => {
        if (channel) {
            setName(channel.name)
            setDescription(channel.description)
        }
    }, [channel])

    const editChannelSubmission = async (e) => {
        e.preventDefault()
        const payload = {
            name,
            description,
            privatechat,
            owner_id: userId,
        }
        const updatedChannel = await dispatch(updateChannel(channelId, payload))
        if (updatedChannel) {
            setErrors([])
            await dispatch(getAllChannels(userId))
            history.push(`/users/${userId}/${channelId}`)
            closeModal(false)
        }
    }
    return (
        <div>

            <form onSubmit={editChannelSubmission}>
                <h1>Edit Channel</h1>
                <ul className="validation-errors">{errors.map((error) => (
                    <li key={error}>
                        {error}
                    </li>))}
                </ul>
                <div>
                    <label>Channel Name: </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <button type="submit" disabled={errors.length > 0}> Update Channel</button>
                </div>
            </form>


        </div>
    )
}

export default EditChannelForm
