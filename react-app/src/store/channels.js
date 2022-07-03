const ALL_CHANNELS = "channels/ALL_CHANNELS";
const CREATE_CHANNEL = "channels/CREATE_CHANNEL"
const UPDATE_CHANNEL = "channels/UPDATE_CHANNEL"
const DELETE_CHANNEL = "channels/DELETE_CHANNEL"

export const allChannels = (channels) => ({
    type: ALL_CHANNELS,
    channels
})

export const createChannels = (channels) => ({
    type: CREATE_CHANNEL,
    channels
})

export const updateOneChannel = (channels) => ({
    type: UPDATE_CHANNEL,
    channels
})

export const removeChannel = (channel) => ({
    type: DELETE_CHANNEL,
    channel
})

export const getAllChannels = (userId) => async dispatch => {
    const response = await fetch(`/api/channels/${userId}`);

    if (response.ok) {

        let channels = await response.json();
        dispatch(allChannels(channels));
        return channels
    }
}

export const createOneChannel = (userId, payload) => async dispatch => {
    const response = await fetch(`/api/channels/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const channels = await response.json();
        dispatch(createChannels(channels))
        return channels
    }
}

export const updateChannel = (channelId, payload) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const channels = await response.json();
        dispatch(updateOneChannel(channels))
        return channels
    }
}

export const deleteChannel = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const deletedChannel = await response.json();
        dispatch(removeChannel(deleteChannel))
        return deletedChannel
    }
}

const initialState = {}

const channelReducer = (state = initialState, action) => {
    // let newState = { ...state }
    switch (action.type) {
        case ALL_CHANNELS:
            const channels = {};
            for (let channel of action.channels.channels) {
                channels[channel.id] = channel;
            }
            return { ...channels };
        case UPDATE_CHANNEL:
            const updatedState = { ...state }
            updatedState[action.channels.id] = action.channels;
            return updatedState
        case DELETE_CHANNEL:
            const newState = {...state}
            delete newState[action.channel.id];
            return newState
        default:
            return state;
    }
}

export default channelReducer;
