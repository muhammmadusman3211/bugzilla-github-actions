import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"
import { useFormik } from "formik"
import * as yup from "yup"

import { options } from "../helpers/options"
import { signInUser } from "../redux/actions/userActions"
import { Header, Spinner } from "../components"

import { LoginStyles } from "../assets/index"

function Login() {
  const [openSnackbar] = useSnackbar(options)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = process.env.REACT_APP_SESSION_URL
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_PROFILE))

  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)

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
      dispatch(
        signInUser(
          url,
          {
            email: values.email,
            password: values.password,
          },
          navigate
        )
      )
    },
  })

  const onForgotPassword = () => {
    navigate("/forgot-password")
  }

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
          />

          {formik.errors.email && <p>{formik.errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          {formik.errors.password && <p>{formik.errors.password}</p>}

          <button className={LoginStyles.submitButton} type="submit">
            Submit
          </button>

          <button
            type="button"
            className={LoginStyles.forgetPasswordBtn}
            onClick={onForgotPassword}
          >
            Forgot Pasword
          </button>

          {error}
        </form>
      )}
    </div>
  )
}

export default Login
