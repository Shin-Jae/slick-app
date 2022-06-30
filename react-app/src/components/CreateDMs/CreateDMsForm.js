import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createOneChannel, getAllChannels } from "../../store/channels"

const set = new Set();
function CreateDMForm({ onClose }) {

  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])

  const userChannels = useSelector((state) => state.channels);
  const channels = Object.values(userChannels);

  //used for search
  const userId = useSelector((state) => state.session.user.id)
  const [query, setQuery] = useState("")
  const allUsers = useSelector((state) => state.search);
  const users = Object.values(allUsers);

  const name = `private for ${userId}`
  const description = `dm description ${userId}`
  const private_chat = true

  let setArr = [...set]

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

  //check if dm already exists
  let matchId;
  channels.forEach(channel => {
    if (channel.private_chat === true) {
      let count = 0

      if (setArr.length === channel.members.length) {
        channel.members.forEach(member => {
          if (setArr.includes(member.id)) count++
        })
        if (count === setArr.length) {
          matchId = channel.id
        }
      }
    }
  })

  const channelSubmission = async (e) => {
    e.preventDefault()

    if (matchId) {
      onClose(false)
      return history.push(`/users/${userId}/${matchId}`)
    }

    const payload = {
      name,
      description,
      private_chat,
      owner_id: userId,
      members: setArr
    }

    const createdChannel = await dispatch(createOneChannel(userId, payload))
    if (createdChannel) {
      setErrors([])
      set.clear();
      await dispatch(getAllChannels(userId))
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

  const removeMembers = (id) => {
    if (set.has(id)) {
      set.delete(id);
      if (query === "") {
        return setQuery("*")
      } else {
        return setQuery("")
      }
    }
  }

  const addMembers = (id) => {
    if (!set.size) set.add(userId)

    if (!set.has(id)) {
      set.add(id);
      return setQuery("")
    }
  }

  return (
    <div className='modal__form-container'>
      <form onSubmit={channelSubmission}>
        <h1>Create New DM</h1>
        <ul>{errors.map((error) => (
          <li className="error_info">
            {error}
          </li>))}
        </ul>
        <div>
          {/* <label>Members: </label> */}
          <div>
            {setArr.length ? setArr.map(person => {
              if (person !== userId) {
                return <div key={person}>
                  <span> {allUsers[person].first_name} {allUsers[person].last_name} </span>
                  <button type="button" onClick={() => removeMembers(allUsers[person].id)}>-</button>
                </div>
              }
            }) : null}
          </div>
          <div>
            <input
              type="text"
              placeholder="Add Members"
              value={query}
              required={!setArr.length}
              onInput={e => setQuery(e.target.value)}
            />
            <ul className="filtered-list" >
              {query.length ? filteredUsers.map(user => {
                if (user.id !== userId) {
                  return <div key={user.id}>
                    <span>{user.first_name} {user.last_name}</span>
                    <button type="button" onClick={() => addMembers(user.id)}>+</button>
                  </div>

                }
              }) : null}
            </ul>
          </div>
        </div>
        <input type="hidden" value={private_chat} />
        <div>
          <button type="submit" disabled={errors.length > 0}>Send DM</button>
        </div>
      </form>
    </div>
  )
}

export default CreateDMForm;
