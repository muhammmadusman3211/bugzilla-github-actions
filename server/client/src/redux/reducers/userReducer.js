import {
  AUTHORIZE_LOG_IN,
  CREATE_BUG,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SIGN_UP_USER,
} from "../actions/constants"

const initialState = {
  users: [],
  message: "",
  loggedIn: false,
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_USER:
      return { ...state, users: payload }
    case SIGN_IN_USER:
      return { ...state, users: payload, loggedIn: true }

    case AUTHORIZE_LOG_IN:
      return {
        ...state,
        users: payload.data.user,
        message: payload.data.message,
        loggedIn: true,
      }
    case SIGN_OUT_USER:
      return { ...state, loggedIn: false }
    case CREATE_BUG:
      return { ...state, loggedIn: true }
    default:
      return state
  }
}
