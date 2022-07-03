import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createOneChannel, getAllChannels } from "../../store/channels"

const set = new Set();
let count = 1
function CreateDMForm({ onClose }) {

  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [found, setFound] = useState('')

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
  const [resetMem, setResetMem] = useState(false)

  let setArr = [...set]

  useEffect(() => {
    if (resetMem === false) {
      set.clear();
    }
  }, [resetMem])

  useEffect(() => {
    const validationErrors = []
    if (count < 2)
      validationErrors.push("Please add a member to the DM")
    setErrors(validationErrors)
  }, [name, description, count, submitted, dispatch])

  //check if dm already exists
  let matchId;
  channels.forEach(channel => {
    if (channel.private_chat === true) {
      let numOfMembers = 0

      if (setArr.length === channel.members.length) {
        channel.members.forEach(member => {
          if (setArr.includes(member.id)) numOfMembers++
        })
        if (numOfMembers === setArr.length) {
          matchId = channel.id
        }
      }
    }
  })

  const channelSubmission = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    if (matchId) {
      onClose(false)
      setResetMem(false)
      set.clear()
      return history.push(`/users/${userId}/${matchId}`)
    }

    const payload = {
      name,
      description,
      private_chat,
      owner_id: userId,
      members: setArr
    }

    if (setArr.length > 1) {
      const createdChannel = await dispatch(createOneChannel(userId, payload))
      if (createdChannel) {
        setErrors([])
        setSubmitted(false)
        set.clear();
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
        return setQuery("*")
      } else {
        return setQuery("")
      }
    }
  }

  const addMembers = (e, id) => {
    e.preventDefault();
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
        <h1>Create New DM</h1>
        {errors[0] &&
          submitted &&
          <div className='error__container'>
            <ul>{errors.map((error) => (
              <li className="error__text"
                key={error}>
                {error}
              </li>))}
            </ul>
          </div>}
        <div>
          {/* <label>Members: </label> */}
          <div className="added-members-container">
            {setArr.length ? setArr.map(person => {
              if (person !== userId) {
                return <div key={person} className="single-member-container">
                  <img src={allUsers[person].profile_img} alt={allUsers[person].id} className="search-profile-pics" /><span className="added-members-names"> {allUsers[person].first_name} {allUsers[person].last_name} </span>
                  <button className='remove-one-member-btn' type="button" onClick={() => removeMembers(allUsers[person].id)}> - </button>
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
              onChange={handleNoUsers}
            />
            <div className={filteredUsers.length !== 0 && filteredUsers.length !== users.length ? 'container-add-members' : 'empty'}>
              <ul className="filtered-list" >
                {query === "*" ? setQuery("") : null}
                {query.length ? filteredUsers.map(user => {
                  if (user.id !== userId && !set.has(user.id)) {
                    return <div key={user.id} className="single-search-names-container">
                      <img src={user.profile_img} alt={user.id} className="search-profile-pics" /><span className='search-names-container search-names-text'>{user.first_name} {user.last_name}</span>
                      <button className='add-members-btn' type="button" onClick={(e) => addMembers(e, user.id)}>+</button>
                    </div>
                  }
                }) : null}
              </ul>
              {!found && !filteredUsers.length &&
                <h4 className='no-users-text-create'>No users by that name</h4>
              }
            </div>
          </div>
        </div>
        <input type="hidden" value={private_chat} />
        <div>
          <button
            type="submit"
            disabled={errors.length > 0}
          >Send DM</button>
        </div>
      </form>
    </div>
  )
}

export default CreateDMForm;
