const ALL_MESSAGES = "messages/ALL_MESSAGES";

export const allMessages = (messages) => ({
    type: ALL_MESSAGES,
    messages
})

export const getAllMessages = (userId, channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${userId}/${channelId}`)

    if (response.ok) {
        let messages = await response.json();
        dispatch(allMessages(messages));
        return messages
    }
}

const initialState = {}

const messageReducer = (state = initialState, action) => {
    // let newState = { ...state }
    switch (action.type) {
        case ALL_MESSAGES:
            const messages = {};

            for (let message of action.messages.messages) {
                messages[message.id] = message;
            }
            return { ...messages };
        default:
            return state;
    }
}

export default messageReducer;
