const ALL_MESSAGES = "messages/ALL_MESSAGES";
const CREATE_MESSAGE = "messages/CREATE_MESSAGE";

export const allMessages = (messages) => ({
  type: ALL_MESSAGES,
  messages
})

export const createOne = (message) => ({
  type: CREATE_MESSAGE,
  message
})

export const getAllMessages = (userId, channelId) => async dispatch => {
  const response = await fetch(`/api/channels/${userId}/${channelId}`)

  if (response.ok) {
    let messages = await response.json();
    dispatch(allMessages(messages));
    return messages
  }
}

export const createNewMessage = (payload) => async dispatch => {
  const response = await fetch(`/api/messages`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const message = await response.json();
    dispatch(createOne(message));
    return message
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
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

    case CREATE_MESSAGE:
      if (!state[action.message.id]) {
        const newState = {
          ...state,
          [action.message.id]: action.message
        }
        return newState;
      }
    default:
      return state;
  }
}

export default messageReducer;
