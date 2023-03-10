import './ChannelForm.css'
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createOneChannel, getAllChannels } from "../../store/channels"
import Select from 'react-select';
import TextareaAutosize from 'react-textarea-autosize';


let count = 1
let set = new Set()
const CreateChannelForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const privatechat = false
  const [errors, setErrors] = useState([]);
  const [members, setMembers] = useState(null);
  const [trySubmit, setTrySubmit] = useState(false)
  const [found, setFound] = useState('')

  //used for search
  const userId = useSelector((state) => state.session.user.id)
  const [query, setQuery] = useState("")
  const allUsers = useSelector((state) => state.search);

  const users = Object.values(allUsers).filter(user => {
    return user.id !== userId
  });

  const usersArray = users.map(user => {
    return { value: user.id, label: `${user.first_name} ${user.last_name}` }
  })

  // const users = Object.values(allUsers);
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
    if (members === null || !members.length)
      validationErrors.push("Please add at least one member to the channel")
    setErrors(validationErrors)
  }, [name, description, members, count, trySubmit, dispatch])

  useEffect(() => {
    if (trySubmit === false) {
      set.clear();
    }
  }, [trySubmit])

  const channelSubmission = async (e) => {
    e.preventDefault()

    const allMembers = members.map(member => {
      return member.value
    })

    allMembers.push(userId);

    const payload = {
      name,
      description,
      privatechat,
      owner_id: userId,
      members: allMembers
    }
    setTrySubmit(true)
    if (!errors.length) {
      const createdChannel = await dispatch(createOneChannel(userId, payload))
      if (createdChannel) {
        setErrors([])
        setTrySubmit(false)
        set.clear()
        count = 1
        await dispatch(getAllChannels(userId))
        history.push(`/users/${userId}/${createdChannel.id}`)
        onClose(false)
      }
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

  const handleNoUsers = (e) => {
    const found = users.find(user =>
      user.first_name.toLowerCase() === query.toLowerCase().trim() ||
      user.last_name.toLowerCase() === query.toLowerCase().trim()
    )
    setFound(found)
  }

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
        {errors[0] && trySubmit &&
          <ul className='error__container'>{errors.map((error) => (
            <li className="error_info error__text" key={error}>
              {error}
            </li>))}
          </ul>}
        <input type="hidden" value={privatechat} />
        <div>
          <input
            placeholder='Channel Name'
            value={name}
            max={100}
            onChange={(e) => setName(e.target.value)}>
          </input>
        </div>
        <div>
          <TextareaAutosize
            className='create__channel--textarea'
            placeholder='Description'
            minRows={4}
            maxLength={255}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          {/* <div className="added-members-container">
            {setArr.length ? setArr.map(person => {
              if (person !== userId) {
                return <div key={`user-${person}`} className="single-member-container">
                  {allUsers[person]?.profile_img ?
                    <img src={allUsers[person]?.profile_img} alt={allUsers[person].id} className="search-profile-pics" />
                    :
                    <div className='default-profile search-profile-pics default-search'>
                      {allUsers[person]?.first_name[0]}
                    </div>}
                  <span className='added-members-names'> {allUsers[person].first_name} {allUsers[person].last_name} </span>
                  <button className='remove-one-member-btn' type="button" onClick={() => removeMembers(allUsers[person].id)}>-</button>
                </div>
              }
            }) : null}
          </div> */}
          <div>
            {/* <input
              type="text"
              placeholder="Add Members"
              value={query}
              onInput={e => setQuery(e.target.value)}
              onChange={handleNoUsers}
            /> */}
            <Select
              closeMenuOnSelect={false}
              isMulti
              placeholder='Search users...'
              onChange={setMembers}
              options={usersArray}
            />
            {/* <div className={filteredUsers.length !== 0 && filteredUsers.length !== users.length ? 'container-add-members' : 'empty'}>
              <ul className="filtered-list-channels" >
                {query === "*" ? setQuery("") : null}
                {query ? filteredUsers.map(user => {
                  if (user.id !== userId && !set.has(user.id)) {
                    return <div key={user.id} className='single-search-names-container'>
                      {user?.profile_img ?
                        <img src={user.profile_img} alt={user.id} className="search-profile-pics" />
                        :
                        <div className='default-profile search-profile-pics default-search'>
                          {user.first_name[0]}
                        </div>}
                      <span className='search-names-container search-names-text'> {user.first_name} {user.last_name}</span>
                      <button className='add-members-btn' type="button" onClick={() => addMembers(user.id)}>+</button>
                    </div>
                  }
                }) : null}
              </ul>
              {!found && !filteredUsers.length &&
                <h4 className='no-users-text-create'>No users by that name</h4>
              }
            </div> */}
          </div>
        </div>
        <div>
          <button
          type="submit"
          id={errors.length ? 'disabled' : ''}
          disabled={errors.length}
          >
          Create Channel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateChannelForm;
