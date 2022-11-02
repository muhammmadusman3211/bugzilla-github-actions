import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"
import { useFormik } from "formik"
import * as yup from "yup"

import { options } from "../helpers/options"
import { signInUser } from "../redux/actions/userActions"
import { Header, Spinner } from "../components"

import { LoginStyles } from "../assets/index"

const Login = () => {
  const [openSnackbar] = useSnackbar(options)
  const user = JSON.parse(localStorage.getItem("profile"))
  console.log(user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = process.env.REACT_APP_SESSION_URL

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(5, "Length should be greater than 5"),
    }),

    onSubmit: (values) => {
      setLoading(true)
      dispatch(
        signInUser(
          url,
          {
            email: values.email,
            password: values.password,
          },
          setLoading,
          setError,
          openSnackbar
        )
      )
    },
  })

  const onForgotPassword = () => {
    navigate("/forgot-password")
  }
  if (user) navigate("/")
  return (
    <div>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <form className={LoginStyles.loginForm} onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          ></input>
          {formik.errors.email && <p>{formik.errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          ></input>
          {formik.errors.password && <p>{formik.errors.password}</p>}
          <button type="button" onClick={onForgotPassword}>
            Forgot Pasword
          </button>
          <button className={LoginStyles.submitButton} type="submit">
            Submit
          </button>
        </form>
      )}
      {error}
    </div>
  )
}

export default Login
