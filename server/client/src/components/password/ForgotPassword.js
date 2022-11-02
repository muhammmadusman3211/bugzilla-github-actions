import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"
import { options } from "../../helpers/options"

import { sendEmail } from "../../redux/actions/userActions"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const emailRef = useRef()
  const navigate = useNavigate()
  const [openSnackbar] = useSnackbar(options)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      sendEmail(
        process.env.REACT_APP_SEND_EMAIL,
        { email: emailRef.current.value },
        openSnackbar,
        navigate
      )
    )
  }
  return (
    <div>
      <label>Enter Email Address</label>
      <input ref={emailRef}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ForgotPassword
