const ALL_CHANNELS = "channels/ALL_CHANNELS";

export const allChannels = (channels) => ({
    type: ALL_CHANNELS,
    channels
})

export const getAllChannels = (userId) => async dispatch => {
    const response = await fetch(`/api/channels/${userId}`);
    console.log('before response thunk')
    if (response.ok) {
        console.log('after response thunk')
        let channels = await response.json();
        dispatch(allChannels(channels));
        return channels
    }
}

const initialState = {}

const channelReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_CHANNELS:
            const channels = {};
            console.log('all channels =========', action.channels.channels)
            for (let channel of action.channels.channels) {
                console.log('one Channel ******', channel)
                channels[channel.id] = channel;
            }
            return { ...channels };
        default:
            return state;
    }
}

export default channelReducer;
