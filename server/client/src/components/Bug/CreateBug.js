import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Calendar from "react-calendar"
import useGetDevelopers from "../../helpers/hooks/useGetDevelopers"

import { createBug } from "../../redux/actions/userActions"

import "react-calendar/dist/Calendar.css"
import Header from "../Header/Header"

import styles from "../../assets/scss/createbug.module.css"
const CreateBug = () => {
  const titleRef = useRef()
  const statusRef = useRef()
  const typeRef = useRef()
  const [loading, setLoading] = useState(false)
  const [developersList, setDevelopersList] = useState([])
  const navigate = useNavigate()
  const [image, setImage] = useState("")
  const [date, setDate] = useState(new Date())
  const { state } = useLocation()

  const developers = useGetDevelopers()
  const dispatch = useDispatch()
  const url = process.env.REACT_APP_CREATE_BUG
  const user = JSON.parse(localStorage.getItem("profile"))
  console.log(user.email)
  const onChange = (e) => {
    setImage(e.target.files[0])
  }

  const addDeveloperToList = (developer) => {
    setDevelopersList([...developersList, developer])
    console.log(developersList)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append("projectId", state?.id)
    formData.append("creator", user._id)
    formData.append("title", titleRef.current.value)
    formData.append("status", statusRef.current.value)
    formData.append("type", typeRef.current.value)
    formData.append("deadline", date.toLocaleDateString())
    formData.append("file", image)
    if (developersList.length > 0) formData.append("developers", developersList)
    if (titleRef && typeRef && statusRef) {
      dispatch(createBug(url, formData, setLoading, setImage))
      navigate("/view-projects")
    } else console.log("Cannot be empty")
  }
  useEffect(() => {}, [image])
  return (
    <>
      <Header />
      <div className="create-bug-wrapper ">
        <form
          action="/create-bug"
          method="post"
          encType="multipart/form-data"
          className="d-flex flex-column w-50 m-4"
        >
          <h2>BUG</h2>
          <input value={state?.id} />
          <label>Bug Creator</label>
          <input value={user.name} disabled></input>

          <label>Title</label>
          <input ref={titleRef} required></input>

          <label>Type</label>
          <select ref={typeRef} required>
            <option>Feature</option>
            <option>Bug</option>
          </select>
          <label>Status</label>
          <select ref={statusRef} required>
            <option>New</option>
            <option>Started</option>

            {typeRef?.current?.value === "Bug" ? (
              <option>Resolved</option>
            ) : (
              <option>Completed</option>
            )}
          </select>
          <div>
            <label>Deadline</label> <br />
            <input value={date.toLocaleDateString()} disabled />
            <Calendar
              onChange={setDate}
              value={date}
              minDate={new Date()}
              defaultView="month"
            />
          </div>

          <label>Attach Screenshot</label>
          <input
            accept=".png, .gif"
            className="image-upload"
            type="file"
            name="image"
            onChange={onChange}
            width="100px"
            height="100px"
          />
          <img src={`http://localhost:3000/${image}`} alt=""></img>

          <button className={styles.createBugBtn} onClick={onSubmit}>
            Create Bug
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateBug
