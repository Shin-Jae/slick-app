import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory } from "react-router-dom"
import { createOneChannel, getAllChannels} from "../../store/channels"


const CreateChannelForm = ({onClose}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [name, setName ] = useState("")
    const [description, setDescription] = useState("")
    const privatechat = false
    const userId = useSelector((state) => state.session.user.id)  
    const  [errors, setErrors] = useState([])
    console.log("-------------------", userId)

    useEffect(() => {
        const validationErrors =[]
        if (!name)
        validationErrors.push("Please enter a channel name")
        if (name.length > 100)
        validationErrors.push('Channel Name must be 100 characters or less')
        if (!description)
        validationErrors.push("Please enter channel's description")        
        if (description.length >255)
        validationErrors.push("Channel Description must be 255 characters or less")
        setErrors(validationErrors)
    }, [name, description, dispatch])

        const channelSubmission = async (e) => {
        e.preventDefault()
        const payload = {
            name,
            description,
            privatechat,
            owner_id: userId,            
        }
        
        const createdChannel = await dispatch(createOneChannel(userId, payload))
        if (createdChannel) {
            setErrors([])
            await dispatch(getAllChannels(userId))
            history.push(`/users/${userId}/${createdChannel.id}`)
            onClose(false)
        }
    }
    return (

        <div>            
            <form onSubmit={channelSubmission}>
                <h1>Create New Channel</h1>
                <ul>{errors.map((error) => (
                    <li className="error_info">
                        {error}
                    </li>))}
                </ul>
                <input type="hidden" value={privatechat} />
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
                    <button type="submit" disabled={errors.length>0}> Create Channel
                    </button>
                </div>
                </form>
        </div>
    )
}

export default CreateChannelForm;