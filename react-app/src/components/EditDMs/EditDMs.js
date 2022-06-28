import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllChannels, updateChannel } from "../../store/channels"

let newMembers = []
let remove = []
function EditDMModalForm({ onClose, channelId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    // const [errors, setErrors] = useState([])

    //used for search
    const userId = useSelector((state) => state.session.user.id)
    const [query, setQuery] = useState("")
    const allUsers = useSelector((state) => state.search);
    const channels = useSelector((state) => state.channels[channelId].members)
    const users = Object.values(allUsers);




    const name = `private ${userId}-${channelId}`
    const description = `dm description ${userId}-${channelId}`
    const private_chat = true


    const editDmSubmission = async (e) => {
        e.preventDefault()

        // let allMembers = newMembers.concat(arr);
        // console.log('alltogether', allMembers)

        const payload = {
            name,
            description,
            private_chat,
            owner_id: userId,
            members: newMembers,
            remove: remove
        }
        console.log('after alltogether and final')
        const updatedDM = await dispatch(updateChannel(channelId, payload))
        if (updatedDM) {
            // setErrors([])
            arr = [];
            remove = []
            newMembers = []
            await dispatch(getAllChannels(userId))
            history.push(`/users/${userId}/${channelId}`)
            onClose(false)
        }
    }

    let arr = []
    for (const channel of channels) {
        arr.push(channel['id'])
    }
    console.log("arr", arr)
    console.log('remove', remove)

    console.log('newMembers', newMembers)

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
        if (!newMembers.includes(id) && !arr.includes(id)) {
            newMembers.push(id);
            console.log("1")
        } else if (newMembers.includes(id)) {
            newMembers.pop(id);
            console.log("2", id);
        } else if (arr.includes(id) && !remove.includes(id)) {
            remove.push(id)
            console.log("3 hello", arr)
        } else if (remove.includes(id)) {
            remove.pop(id)
        }
    }

    const addedMembers = (!newMembers.length && remove.length === arr.length - 1) || (!newMembers.length && !remove.length)

    return (
        <div>
            <form onSubmit={editDmSubmission}>
                <h1>Edit DM</h1>
                {/* <ul>{errors.map((error) => (
                    <li className="error_info" key={error}>
                        {error}
                    </li>))}
                </ul> */}
                <div>
                    <label>Members: </label>
                    <div>
                        {arr.length || newMembers.length ? arr.concat(newMembers).map(person => {
                            if (person !== userId && !remove.includes(person)) {
                                return <div key={`mem-${person}`}> --- {allUsers[person].first_name} {allUsers[person].last_name}</div>
                            }
                        })
                            : null}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onInput={e => setQuery(e.target.value)}
                        />
                        <ul className="filtered-list" >
                            {query ? filteredUsers.map(user => {
                                if (user.id !== userId) return <div onClick={() => channelMembers(user.id)} key={user.id}>{user.first_name} {user.last_name}</div>
                            }) : null}
                        </ul>
                    </div>
                </div>
                <input type="hidden" value={private_chat} />
                <div>
                    <button type="submit" disabled={addedMembers}>Edit DM</button>
                </div>
            </form>
        </div>
    )
}

export default EditDMModalForm;
