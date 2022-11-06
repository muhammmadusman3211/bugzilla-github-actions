import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"

import { options } from "../../helpers/options"
import { changePassword } from "../../redux/actions/userActions"

function ChangePassword() {
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const codeRef = useRef()
  const navigate = useNavigate()
  const [openSnackbar] = useSnackbar(options)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      changePassword(
        process.env.REACT_APP_CHANGE_PASSWORD,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          otp: codeRef.current.value,
        },
        openSnackbar,
        navigate
      )
    )
  }
  return (
    <div>
      <p>Enter Email Address</p>
      <input ref={emailRef} />
      <p>Enter Password</p>
      <input ref={passwordRef} />
      <p>Enter Code</p>
      <input ref={codeRef} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default ChangePassword
