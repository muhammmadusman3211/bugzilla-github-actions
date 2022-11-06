import { useDispatch, useSelector } from "react-redux"
import { useSnackbar } from "react-simple-snackbar"
import { useEffect } from "react"

import { authorizeLogIn } from "../../redux/actions/userActions"
import { options } from "../options"
import { AUTHORIZED_ROUTE } from "../../redux/actions/constants"

export const useAuthorize = (url) => {
  const dispatch = useDispatch()
  const [openSnackbar] = useSnackbar(options)
  const message = useSelector((state) => state.user.message)

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))

    dispatch(
      authorizeLogIn(
        url + process.env.REACT_APP_AUTHORIZE,
        profile,
        openSnackbar
      )
    )
  }, [])

  return message === AUTHORIZED_ROUTE
}
