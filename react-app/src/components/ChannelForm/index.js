import './ChannelForm.css'
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createOneChannel, getAllChannels } from "../../store/channels"

let set = new Set()
let count = 1
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
    if (count < 2)
      validationErrors.push("Please add a member to the channel")
    setErrors(validationErrors)
  }, [name, description, count, dispatch])

  const channelSubmission = async (e) => {
    e.preventDefault()
    const payload = {
      name,
      description,
      privatechat,
      owner_id: userId,
      members: setArr
    }

    const createdChannel = await dispatch(createOneChannel(userId, payload))
    if (createdChannel) {
      setErrors([])
      set.clear()
      count = 1
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
      count -= 1
      if (query === "") {
        setQuery("*")
      } else {
        return setQuery("")
      }
    }
  }

  const addMembers = (id) => {
    if (!set.size) set.add(userId)

    if (!set.has(id)) {
      set.add(id);
      count += 1
      return setQuery("")
    }
  }

  return (
    <div className='modal__form-container'>
      <form onSubmit={channelSubmission}>
        <h1>Create New Channel</h1>
        <ul>{errors.map((error) => (
          <li className="error_info" key={error}>
            {error}
          </li>))}
        </ul>
        <input type="hidden" value={privatechat} />
        <div>
          <input
            placeholder='Channel Name'
            value={name}
            onChange={(e) => setName(e.target.value)}>
          </input>

        </div>
        <div>
          <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <div className="added-members-container">
            {setArr.length ? setArr.map(person => {
              if (person !== userId) {
                return <div key={`user-${person}`} className="single-member-container">
                  <img src={allUsers[person].profile_img} alt={allUsers[person].id} className="search-profile-pics" /><span className='added-members-names'> {allUsers[person].first_name} {allUsers[person].last_name} </span>
                  <button className='remove-one-member-btn' type="button" onClick={() => removeMembers(allUsers[person].id)}>x</button>
                </div>
              }
            }) : null}
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onInput={e => setQuery(e.target.value)}
            />
            {filteredUsers.length !== 0 && filteredUsers.length !== users.length ? <div className='container-add-members'>
              <ul className="filtered-list-channels" >
                {query ? filteredUsers.map(user => {
                  if (user.id !== userId && !set.has(user.id)) {
                    return <div key={user.id} className='single-search-names-container'>
                      <img src={user.profile_img} alt={user.id} className="search-profile-pics" /><span className='search-names-container search-names-text'> {user.first_name} {user.last_name}</span>
                      <button className='add-members-btn' type="button" onClick={() => addMembers(user.id)}>+</button>
                    </div>
                  }
                }) : null}
              </ul>
            </div>
              : <div className='empty'>
                <ul className="filtered-list-channels" >
                  {query ? filteredUsers.map(user => {
                    if (user.id !== userId) {
                      return <div key={user.id}>
                        <span >{user.first_name} {user.last_name}</span>
                        <button type="button" onClick={() => addMembers(user.id)}>+</button>
                      </div>
                    }
                  }) : null}
                </ul>
              </div>}
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
