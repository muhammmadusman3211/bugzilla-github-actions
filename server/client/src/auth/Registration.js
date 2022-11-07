import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"

import { signUpUser } from "../redux/actions/userActions"
import { Header, Spinner } from "../components"
import { registrationSchema } from "./schema"

import styles from "../assets/scss/registration.module.css"

function Registrations() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
  })

  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)

  const roleRef = useRef()
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = process.env.REACT_APP_REGISTRATION_URL

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      setClicked(true)
      setFormState({
        ...formState,
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        role: roleRef.current.value,
      })
    },
  })

  useEffect(() => {
    if (clicked) {
      dispatch(signUpUser(url, formState, navigate))
    }
  }, [clicked, formState, url, dispatch, navigate])

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <form className={styles.registrationForm} onSubmit={formik.handleSubmit}>
        <input
          type="name"
          name="name"
          placeholder="Your Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && <p>{formik.errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {formik.errors.name && <p>{formik.errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        {formik.errors.password && <p>{formik.errors.password}</p>}

        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
        />

        {formik.errors.passwordConfirmation && (
          <p>{formik.errors.passwordConfirmation}</p>
        )}

        <select name="roles" ref={roleRef} onChange={formik.handleChange}>
          <option value="manager">Manager</option>
          <option value="developer">Developer</option>
          <option value="qa">QA</option>
        </select>

        {formik.errors.role && <p>{formik.errors.role}</p>}

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
        {error}
      </form>
    </>
  )
}

export default Registrations
