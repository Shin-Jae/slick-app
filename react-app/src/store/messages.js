const ALL_MESSAGES = "messages/ALL_MESSAGES";
const CREATE_MESSAGE = "messages/CREATE_MESSAGE";
const UPDATE_MESSAGE = 'message/UPDATE_MESSAGE'
const DELETE_MESSAGE = 'message/DELETE_MESSAGE'

export const allMessages = (messages) => ({
  type: ALL_MESSAGES,
  messages
})

export const createOne = (message) => ({
  type: CREATE_MESSAGE,
  message
})

export const updateOne = (updatedMessage) => ({
  type: UPDATE_MESSAGE,
  updatedMessage
})

export const deleteOne = (deletedMessage) => ({
  type: DELETE_MESSAGE,
  deletedMessage
})

export const getAllMessages = (userId, channelId) => async dispatch => {
  const response = await fetch(`/api/channels/${userId}/${channelId}`)

  if (response.ok) {
    let messages = await response.json();
    dispatch(allMessages(messages));
    return messages
  }
}

export const updateMessage = (payload, messageId) => async dispatch => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedMessage = await response.json();
    dispatch(updateOne(updatedMessage));
    return updatedMessage
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

export const deleteMessage = (id) => async dispatch => {
  const response = await fetch(`/api/messages/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(deleteOne(deletedMessage));
    return deletedMessage;
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
        return newState
      };
    case UPDATE_MESSAGE:
      const updatedState = {
        ...state,
        [action.updatedMessage.id]: {
          ...state[action.updatedMessage.id],
          ...action.updatedMessage
        }
      }
      return updatedState;
    case DELETE_MESSAGE:
      const newState = { ...state };
      delete newState[action.deletedMessage.id];
      return newState;
    default:
      return state;
  }
}

export default messageReducer;
