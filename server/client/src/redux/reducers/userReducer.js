import {
  AUTHORIZE_LOG_IN,
  CREATE_BUG,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_LOADING,
  SIGN_OUT_USER,
  SIGN_UP_SUCCESS,
  SIGN_UP_LOADING,
  SIGN_UP_ERROR,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_LOADING,
  EDIT_PROJECT_ERROR,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_LOADING,
  CREATE_PROJECT_ERROR,
  CREATE_BUG_ERROR,
  CREATE_BUG_LOADING,
  CREATE_BUG_SUCCESS,
} from "../actions/constants"

const initialState = {
  users: [],
  projects: [],
  bugs: [],
  error: "",
  loading: false,
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_LOADING:
      return { ...state, loading: payload.loading }
    case SIGN_UP_ERROR:
      return { ...state, error: payload.error, loading: payload.loading }
    case SIGN_UP_SUCCESS:
      return { ...state, users: payload.users, loading: payload.loading }
    case SIGN_IN_LOADING:
      return { ...state, loading: payload.loading }
    case SIGN_IN_ERROR:
      return { ...state, error: payload.error, loading: payload.loading }
    case SIGN_IN_SUCCESS:
      return { ...state, users: payload.users, loading: payload.loading }
    case CREATE_PROJECT_LOADING:
      return { ...state, loading: payload.loading }
    case CREATE_PROJECT_ERROR:
      return { ...state, error: payload.error, loading: payload.loading }
    case CREATE_PROJECT_SUCCESS:
      return { ...state, projects: payload.projects, loading: payload.loading }
    case EDIT_PROJECT_LOADING:
      return { ...state, loading: payload.loading }
    case EDIT_PROJECT_ERROR:
      return { ...state, error: payload.error, loading: payload.loading }
    case EDIT_PROJECT_SUCCESS:
      return { ...state, projects: payload.projects, loading: payload.loading }
    case CREATE_BUG_LOADING:
      return { ...state, loading: payload.loading }
    case CREATE_BUG_ERROR:
      return { ...state, error: payload.error, loading: payload.loading }
    case CREATE_BUG_SUCCESS:
      return { ...state, bugs: payload.bugs, loading: payload.loading }
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
