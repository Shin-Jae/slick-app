import { useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState("")
    const allUsers = useSelector((state) => state.search);
    const users = Object.values(allUsers);

    const userChannels = useSelector((state) => state.channels);
    const channels = Object.values(userChannels);

    const userId = useSelector((state) => state.session.user.id);

    let channelId;

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
                            channels.forEach(channel => {
                                if (channel.members.length <= 2) {
                                    return channel.members.forEach(member => {
                                        if (member.id === user.id && channel.private === true) {
                                            channelId = channel.id
                                        }
                                    })
                                }
                                if (channelId === undefined) channelId = 1
                            })
                            return <NavLink to={`/users/${userId}/${channelId}`} key={user.id}><div>{user.first_name} {user.last_name}</div></NavLink>
                            // return < button type="button" > hi</button>
                        }) : null}
                    </ul>
                </div>
                : null}
        </div >
    )
}

export default SearchBar;
