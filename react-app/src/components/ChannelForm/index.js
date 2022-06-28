import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createOneChannel, getAllChannels } from "../../store/channels"

let arr = []
const CreateChannelForm = ({ onClose }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const privatechat = false
    const [errors, setErrors] = useState([])

    //used for search
    const userId = useSelector((state) => state.session.user.id)
    const [query, setQuery] = useState("")
    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);

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

    const channelSubmission = async (e) => {
        e.preventDefault()
        const payload = {
            name,
            description,
            privatechat,
            owner_id: userId,
            members: arr
        }

        const createdChannel = await dispatch(createOneChannel(userId, payload))
        if (createdChannel) {
            setErrors([])
            await dispatch(getAllChannels(userId))
            arr = [];
            history.push(`/users/${userId}/${createdChannel.id}`)
            onClose(false)
        }
    }

    const filterUsers = (users, query) => {
        if (!query) {
            return users;
        }
        return users.filter((user) => {
            const fullName = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
            return fullName.includes(query.toLowerCase());
        })
    }
    const filteredUsers = filterUsers(users, query);

    const channelMembers = (id) => {
        if (!arr.length) {
            arr.push(userId)
        }

        if (!arr.includes(id)) {
            arr.push(id);
        } else {
            arr.pop(id);
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
                    <label>Members: </label>
                    <div>
                        {arr.length ? arr.map(person => {
                            if (person !== userId) {
                                return <div> --- {allUsers[person].first_name} {allUsers[person].last_name}</div>
                            }
                        }) : null}
                    </div>
                    <div>
                        <form>
                            <input
                                type="text"
                                placeholder="Search"
                                value={query}
                                onInput={e => setQuery(e.target.value)}
                            />
                        </form>
                        <ul className="filtered-list" >
                            {query ? filteredUsers.map(user => {
                                if (user.id !== userId) return <div onClick={() => channelMembers(user.id)} key={user.id}>{user.first_name} {user.last_name}</div>
                            }) : null}
                        </ul>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={errors.length > 0}> Create Channel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateChannelForm;
