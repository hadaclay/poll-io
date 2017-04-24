// Action types
export const NEW_POLL = 'NEW_POLL'
export const DELETE_POLL = 'DELETE_POLL'
export const ADD_OPTION = 'ADD_OPTION'
export const VOTE = 'VOTE'

// Action creators
export const newPoll = (title, options) => ({
  type: NEW_POLL,
  payload: {
    title,
    options
  }
})

export const deletePoll = id => ({
  type: DELETE_POLL,
  payload: {
    id
  }
})

export const addOption = (id, option) => ({
  type: ADD_OPTION,
  payload: {
    id,
    option
  }
})

export const vote = (id, option) => ({
  type: VOTE,
  payload: {
    option
  }
})
