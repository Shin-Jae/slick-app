import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllChannels, updateChannel } from "../../store/channels"

let remove = new Set()
function EditDMModalForm({ onClose, channelId, showModal, set }) {
    const dispatch = useDispatch()
    const history = useHistory()

    //used for search
    const userId = useSelector((state) => state.session.user.id)
    const [query, setQuery] = useState("")
    const allUsers = useSelector((state) => state.search);
    const channels = useSelector((state) => state.channels[channelId].members)
    const users = Object.values(allUsers);

    //default entries for name and description/ private always true for dms
    const name = `private ${userId}-${channelId}`
    const description = `dm description ${userId}-${channelId}`
    const private_chat = true


    const editDmSubmission = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            description,
            private_chat,
            owner_id: userId,
            members: setArr,
            remove: removeArr
        }
        const updatedDM = await dispatch(updateChannel(channelId, payload))
        if (updatedDM) {
            set.clear();
            remove.clear();
            await dispatch(getAllChannels(userId))
            history.push(`/users/${userId}/${channelId}`)
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

    let setArr = [...set];
    let removeArr = [...remove];

    const channelMembers = (id) => {
        if (set.has(id) && !remove.has(id)) {
            set.delete(id);
            remove.add(id);
        } else if (!set.has(id) && remove.has(id)) {
            set.add(id)
            remove.delete(id)
        } else if (!set.has(id)) {
            set.add(id)
        }
    }

    return (
        <div>
            <form onSubmit={editDmSubmission}>
                <h1>Edit DM</h1>
                <div>
                    <label>Members: </label>
                    <div>
                        {setArr.length ? setArr.map(person => {
                            if (person !== userId) {
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
                    <button type="submit" disabled={false}>Edit DM</button>
                </div>
            </form>
        </div>
    )
}

export default EditDMModalForm;
