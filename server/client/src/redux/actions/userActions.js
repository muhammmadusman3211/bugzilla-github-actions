import {
  SIGN_IN_SUCCESS,
  SIGN_IN_LOADING,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_LOADING,
  SIGN_OUT_USER,
  AUTHORIZE_LOG_IN,
  CREATE_BUG_SUCCESS,
  CREATE_BUG_ERROR,
  CREATE_BUG_LOADING,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_LOADING,
  EDIT_PROJECT_SUCCESS,
  SEND_EMAIL,
  CHANGE_PASSWORD,
  AUTHORIZED_ROUTE,
  EDIT_PROJECT_LOADING,
  EDIT_PROJECT_ERROR,
} from "./constants"
import {
  LogoutApi,
  AuthLoginApi,
  AuthApi,
  CreateBugApi,
  CreateProjectApi,
  EditProjectApi,
  SendEmailApi,
  ChangePasswordApi,
} from "../../api/api"

import * as Path from "../../constants"

export const signUpUser = (url, data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_UP_LOADING, payload: { loading: true } })
    const response = await AuthApi(url, data)
    if (response.status === "ok") {
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: { user: response, loading: false, error: null },
      })
      navigate(Path.Login)
    } else if (response.status === "error") {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: { error: response.error, loading: false },
      })
    }
  } catch (err) {
    dispatch({
      type: SIGN_UP_ERROR,
      payload: { error: err.response.data.error.errmsg },
      loading: false,
    })
  }
}

export const signInUser = (url, data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_LOADING, payload: { loading: true } })
    const response = await AuthApi(url, data)
    if (response.status === "ok") {
      localStorage.setItem("profile", JSON.stringify(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user: response.data.user, loading: false, error: null },
      })
      navigate(Path.ViewProjects)
    } else if (response.status === "error") {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: { error: response.error, loading: false },
      })
    }
  } catch (err) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: { error: err.response.data.error.errmsg },
      loading: false,
    })
  }
}

export const createProject = (url, data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROJECT_LOADING, payload: { loading: true } })
    const response = await CreateProjectApi(url, data)
    if (response.status === "ok") {
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: {
          projects: response.data.projects,
          loading: false,
          error: null,
        },
      })
      navigate(Path.ViewProjects)
    } else if (response.status === "error") {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: { error: response.error, loading: false },
      })
    }
  } catch (err) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: { error: err.response.data.error.errmsg },
      loading: false,
    })
  }
}

export const editProject = (url, data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_PROJECT_LOADING, payload: { loading: true } })
    const response = await EditProjectApi(url, data)
    console.log(response)
    if (response.status === "ok") {
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: {
          projects: response.projects,
          loading: false,
          error: null,
        },
      })
      navigate(Path.ViewProjects)
    } else if (response.status === "error")
      dispatch({
        type: EDIT_PROJECT_ERROR,
        payload: { error: response.error, loading: false },
      })
  } catch (err) {
    dispatch({
      type: EDIT_PROJECT_ERROR,
      payload: { error: err.response.data.error.errmsg },
      loading: false,
    })
  }
}
export const createBug =
  (url, data, setImage, navigate) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BUG_LOADING, payload: { loading: true } })
      const response = await CreateBugApi(url, data)
      if (response.status === "ok") {
        setImage(response.bug.image.path)
        dispatch({
          type: CREATE_BUG_SUCCESS,
          payload: { bug: response.bugs, loading: false, error: null },
        })
        navigate(Path.ViewProjects)
      } else if (response.status === "error") {
        dispatch({
          type: CREATE_BUG_ERROR,
          payload: { error: response.error, loading: false },
        })
      }
    } catch (err) {
      dispatch({
        type: CREATE_BUG_ERROR,
        payload: { error: err.response.data.error.errmsg },
        loading: false,
      })
    }
  }

export const authorizeLogIn = (url, data, openSnackbar) => async (dispatch) => {
  try {
    const user = await AuthLoginApi(url, data)
    dispatch({ type: AUTHORIZE_LOG_IN, payload: user })
    if (user.data.message !== AUTHORIZED_ROUTE)
      openSnackbar("You are not Authorized")
  } catch (err) {
    console.log(err)
  }
}

export const signOutUser =
  (url, setLoading, openSnackbar, navigate) => async (dispatch) => {
    try {
      await LogoutApi(url)
      localStorage.removeItem("profile")
      localStorage.removeItem("token")
      dispatch({ type: SIGN_OUT_USER })
      setLoading(false)
      openSnackbar("You have sucessfully Logged Out")
      navigate(Path.Login)
    } catch (err) {
      console.log(err)
    }
  }

export const sendEmail =
  (url, data, openSnackbar, navigate) => async (dispatch) => {
    try {
      const res = await SendEmailApi(url, data)
      openSnackbar(res.data.message)
      dispatch({ type: SEND_EMAIL })
      navigate(Path.ChangePassword)
    } catch (err) {
      console.log(err)
    }
  }

export const changePassword =
  (url, data, openSnackbar, navigate) => async (dispatch) => {
    try {
      const res = await ChangePasswordApi(url, data)
      openSnackbar(res.data.message)
      navigate(Path.Login)
      dispatch({ type: CHANGE_PASSWORD })
    } catch (err) {
      console.log(err)
    }
  }
