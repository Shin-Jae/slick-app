
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateChannel, getAllChannels } from "../../store/channels"

let remove = new Set()
const EditChannelForm = ({ channelId, set, onClose }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const channel = useSelector((state) => state.channels[channelId])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const privatechat = false
  const userId = useSelector((state) => state.session.user.id)
  const [errors, setErrors] = useState([])

  //used for search
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
      members: setArr,
      remove: removeArr
    }
    const updatedChannel = await dispatch(updateChannel(channelId, payload))
    if (updatedChannel) {
      set.clear();
      remove.clear();
      setErrors([])
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

  const removeMembers = (id) => {
    if (set.has(id) && !remove.has(id)) {
      set.delete(id);
      remove.add(id);
      if (query === "") {
        return setQuery("-")
      } else {
        return setQuery("")
      }
    }
  }

  const addMembers = (id) => {
    if (!set.has(id) && remove.has(id)) {
      set.add(id)
      remove.delete(id)
      return setQuery("")
    } else if (!set.has(id)) {
      set.add(id)
      return setQuery("")
    }
  }

  return (
    <div div className='modal__form-container'>
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
          {setArr.length ? setArr.map(person => {
            if (person !== userId) {
              return <div key={`mem-${person}`}>
                <span> -- {allUsers[person].first_name} {allUsers[person].last_name}</span>
                <button type="button" onClick={() => removeMembers(allUsers[person].id)}>-</button>
              </div>
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
              if (user.id !== userId) {
                return <div key={user.id}>
                  <span >{user.first_name} {user.last_name}</span>
                  <button type="button" onClick={() => addMembers(user.id)}>+</button>
                </div>
              }
            }) : null}
          </ul>
        </div>
        <div>
          <button type="submit" disabled={errors.length > 0} style={{ cursor: "pointer" }}> Update Channel</button>
        </div>

      </form>


    </div>
  )
}

export default EditChannelForm
