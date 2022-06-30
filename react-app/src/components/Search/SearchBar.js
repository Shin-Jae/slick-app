import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { createOneChannel, getAllChannels } from "../../store/channels";

function SearchBar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("")
    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);
    const userChannels = useSelector((state) => state.channels);
    const channels = Object.values(userChannels);
    const userId = useSelector((state) => state.session.user.id);

    //search members if one to one dm exist
    let match = []
    let matchId = []
    channels.filter(channel => {
        if (channel.private_chat === true && channel.members.length === 2) {
            match.push(channel.id)
            return channel.members.forEach(member => {
                if (member.id !== userId) return matchId.push(member.id)
            })
        } else {
            return null
        }
    })

    //if one to one exist the redirect else create dm
    const checkDm = async (id) => {
        if (matchId.includes(id)) {
            let idx = matchId.indexOf(id)
            let channelId = match[idx]
            setQuery("")
            return history.push(`/users/${userId}/${channelId}`)
        } else {
            const payload = {
                name: `private-${userId}-${id}`,
                description: 'search-private-dm',
                private_chat: true,
                owner_id: userId,
                members: [userId, id]
            }
            const createSearchDM = await dispatch(createOneChannel(userId, payload))
            if (createSearchDM) {
                setQuery("")
                await dispatch(getAllChannels(userId))
                history.push(`/users/${userId}/${createSearchDM.id}`)
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


    return (
        <div className="container-full-search">
            <form>
                <input
                    className="input-search-bar-field"
                    type="text"
                    placeholder="Search Slick"
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                />
            </form>
            {query ?
                <div className="container-search-result">
                    <ul className="filtered-list" >
                        {query ? filteredUsers.map(user => {
                            if (user.id !== userId) {
                                return <div key={user.id}><button className="nav-search-results" type="button" onClick={() => checkDm(user.id)}>{user.first_name} {user.last_name}</button></div>
                            }
                        }) : null}
                    </ul>
                </div>
                : null}
        </div >
    )
}

export default SearchBar;
