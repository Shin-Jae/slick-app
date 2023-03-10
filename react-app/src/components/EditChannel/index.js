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
  const [errors, setErrors] = useState([])
  const [found, setFound] = useState('')
  const userId = useSelector((state) => state.session.user.id)

  const [query, setQuery] = useState("")
  const allUsers = useSelector((state) => state.search);
  const users = Object.values(allUsers);

  const handleNoUsers = (e) => {
    const found = users.find(user =>
      user.first_name.toLowerCase() === query.toLowerCase().trim() ||
      user.last_name.toLowerCase() === query.toLowerCase().trim()
    )
    setFound(found)
  }

  let setLength = set.size;

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
    if (setLength <= 1)
      validationErrors.push("Please add a member or members")
    setErrors(validationErrors)
  }, [name, description, setLength, dispatch])

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
      // set.clear();
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
    if (set.has(id) && remove.has(id)) {
      set.delete(id);
      return setQuery("*")
    } else if (set.has(id) && !remove.has(id)) {
      set.delete(id);
      remove.add(id);
      if (query === "") {
        return setQuery("*")
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
        <ul className="error__container">{errors.map((error) => (
          <li className="error_info error__text" key={error}>
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
        <div className="added-members-container">
          {setArr.length ? setArr.map(person => {
            if (person !== userId) {
              return <div key={`mem-${person}`} className="single-member-container">
                {allUsers[person]?.profile_img ?
                  <figure style={{ backgroundImage: `url(${allUsers[person].profile_img})`}} alt={allUsers[person].id} className="search-profile-pics" />
                  :
                  <div className='default-profile search-profile-pics default-search'>
                    {allUsers[person]?.first_name[0]}
                  </div>}
                <span className='added-members-names'> {allUsers[person].first_name} {allUsers[person].last_name}</span>
                <button className='remove-one-member-btn' type="button" onClick={() => removeMembers(allUsers[person].id)}>-</button>
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
            onChange={handleNoUsers}
          />
          <div className={(filteredUsers.length !== 0 && filteredUsers.length !== users.length) ? 'container-add-members' : 'empty'}>
            <ul className="filtered-list" >
              {query === "*" ? setQuery("") : null}
              {query ? filteredUsers.map(user => {
                if (user.id !== userId && !set.has(user.id)) {
                  return <div key={user.id} className='single-search-names-container'>
                    {user?.profile_img ?
                      <figure style={{ backgroundImage: `url (${user.profile_img})`}} alt={user.id} className="search-profile-pics" />
                      :
                      <div className='default-profile search-profile-pics default-search'>
                        {user.first_name[0]}
                      </div>}
                    <span className='search-names-container search-names-text' >{user.first_name} {user.last_name}</span>
                    <button className='add-members-btn' type="button" onClick={() => addMembers(user.id)}>+</button>
                  </div>
                }
              }) : null}
            </ul>
            {!found && !filteredUsers.length &&
              <h4 className='no__users--text-channels'>No users by that name</h4>
            }
          </div>
        </div>
        <div>
          <button type="submit" disabled={errors.length > 0} style={{ cursor: "pointer" }}> Update Channel</button>
        </div>

      </form>


    </div>
  )
}

export default EditChannelForm
