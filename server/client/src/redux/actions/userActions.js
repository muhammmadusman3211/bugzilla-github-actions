import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER,
  AUTHORIZE_LOG_IN,
  CREATE_BUG,
  CREATE_PROJECT,
  EDIT_PROJECT,
} from "./constants"
import { AUTHORIZED_ROUTE } from "./constants"
import {
  LogoutApi,
  AuthLoginApi,
  AuthApi,
  CreateBugApi,
  CreateProjectApi,
  EditProjectApi,
} from "../../api/api"

export const signUpUser =
  (url, data, setLoading, navigate) => async (dispatch) => {
    try {
      const user = await AuthApi(url, data)

      dispatch({ type: SIGN_UP_USER, user })
      setLoading(false)
      navigate("/login")
    } catch (err) {
      console.log("reducer", err)
    }
  }

export const signInUser =
  (url, data, setLoading, setError, openSnackbar) => async (dispatch) => {
    try {
      let user = await AuthApi(url, data)
      console.log(user)
      if (!user.response.status === 404) {
        localStorage.setItem("profile", JSON.stringify(user.data.body))
        localStorage.setItem("token", JSON.stringify(user.data.token))
        setLoading(false)
        openSnackbar("You have sucessfully Signed In")
        dispatch({ type: SIGN_IN_USER, payload: user })
      } else {
        setError(user.response.data.message)
        setLoading(false)
        openSnackbar(user.response.data.message)
        dispatch({ type: SIGN_IN_USER, payload: user.response.data.message })
      }
    } catch (err) {
      openSnackbar(err)
    }
  }

export const authorizeLogIn = (url, data, openSnackbar) => async (dispatch) => {
  try {
    const user = await AuthLoginApi(url, data)
    dispatch({ type: AUTHORIZE_LOG_IN, payload: user })
    console.log("message", user.data.message)
    if (user.data.message !== AUTHORIZED_ROUTE)
      openSnackbar("You are not Authorized")
  } catch (err) {
    console.log(err)
    const error = err
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
      navigate("/login")
    } catch (err) {
      console.log(err)
      const error = err
    }
  }

export const createBug =
  (url, data, setLoading, setImage) => async (dispatch) => {
    try {
      console.log(url, data)
      const res = await CreateBugApi(url, data)
      console.log(res)
      setImage(res.bug.image.path)
      dispatch({ type: CREATE_BUG })
      setLoading(false)
    } catch (err) {
      console.log(err)
      const error = err
    }
  }

export const createProject = (url, data, setLoading) => async (dispatch) => {
  console.log(data)
  try {
    const res = await CreateProjectApi(url, data)
    console.log("Project", data)
    dispatch({ type: CREATE_PROJECT })
    setLoading(false)
  } catch (err) {
    console.log(err)
    const error = err
  }
}

export const editProject = (url, data, setLoading) => async (dispatch) => {
  console.log(data)
  try {
    const res = await EditProjectApi(url, data)
    console.log("Project", res)
    dispatch({ type: EDIT_PROJECT })
    setLoading(false)
  } catch (err) {
    console.log(err)
    const error = err
  }
}
