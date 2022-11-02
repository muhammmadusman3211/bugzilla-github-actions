import React, { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as yup from "yup"

import { signUpUser } from "../redux/actions/userActions"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { Spinner } from "../components"

import styles from "../assets/scss/registration.module.css"

const Registrations = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
  })
  const roleRef = useRef()
  const [clicked, setClicked] = useState(false)
  const [loading, setLoading] = useState(false)
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
    validationSchema: yup.object({
      name: yup.string().required("Name is Required"),
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(5, "Length should be greater than 5"),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setClicked(true)
      setState({
        ...state,
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
      dispatch(signUpUser(url, state, setLoading, navigate))
      setLoading(true)
    }
  }, [clicked, state, url, dispatch, navigate])

  return loading ? (
    <Spinner />
  ) : (
    <form className={styles.registrationForm} onSubmit={formik.handleSubmit}>
      <input
        type="name"
        name="name"
        placeholder="Your Name"
        onChange={formik.handleChange}
        value={formik.values.name}
      ></input>
      {formik.errors.name && <p>{formik.errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      ></input>
      {formik.errors.name && <p>{formik.errors.email}</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      ></input>
      {formik.errors?.password && <p>{formik.errors.password}</p>}
      <input
        type="password"
        name="passwordConfirmation"
        placeholder="Password Confirmation"
        onChange={formik.handleChange}
        value={formik.values.passwordConfirmation}
      ></input>
      {formik.errors?.passwordConfirmation && (
        <p>{formik.errors.passwordConfirmation}</p>
      )}
      <select name="roles" ref={roleRef} onChange={formik.handleChange}>
        <option value="manager">Manager</option>
        <option value="developer">Developer</option>
        <option value="qa">QA</option>
      </select>
      {formik.errors?.role && <p>{formik.errors.role}</p>}
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  )
}

export default Registrations
