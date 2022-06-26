const ALL_USERS = 'session/ALL_USERS';

export const allUsers = (users) => ({
    type: ALL_USERS,
    users
})

export const getAllUsers = () => async dispatch => {
    const response = await fetch(`/api/users`)

    if (response.ok) {
        let users = await response.json()
        dispatch(allUsers(users));
        return users
    }
}

const initialState = {}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USERS:
            const users = {};

            for (let user of action.users.users) {
                users[user.id] = user;
            }
            return { ...users };
        default:
            return state;
    }
}

export default searchReducer;
