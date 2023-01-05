import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Calendar from "react-calendar"

import { createBug } from "../../redux/actions/userActions"

import { Header, Spinner } from "../../components"

import "react-calendar/dist/Calendar.css"
import styles from "../../assets/scss/createbug.module.css"

function CreateBug() {
  const titleRef = useRef()
  const statusRef = useRef()
  const typeRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [image, setImage] = useState("")
  const [date, setDate] = useState(new Date())

  // eslint-disable-next-line no-shadow
  const loading = useSelector((state) => state.user.loading)
  // eslint-disable-next-line no-shadow
  const error = useSelector((state) => state.user.error)
  const url = process.env.REACT_APP_CREATE_BUG
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_PROFILE))

  const onChange = (e) => {
    setImage(e.target.files[0])
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("projectId", state.id)
    formData.append("creator", user._id)
    formData.append("title", titleRef.current.value)
    formData.append("status", statusRef.current.value)
    formData.append("type", typeRef.current.value)
    formData.append("deadline", date.toLocaleDateString())
    formData.append("file", image)
    dispatch(createBug(url, formData, setImage, navigate))
  }
  useEffect(() => {}, [image])
  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <div className="create-bug-wrapper ">
          <form className="d-flex flex-column w-50 m-4">
            <h2>BUG</h2>
            <input value={state.id} />
            <p>Bug Creator</p>
            <input value={user.name} disabled />
            <p>Title</p>
            <input ref={titleRef} required />
            <p>Type</p>

            <select ref={typeRef} required>
              <option>Feature</option>
              <option>Bug</option>
            </select>

            <p>Status</p>

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
              <p>Deadline</p> <br />
              <input value={date.toLocaleDateString()} disabled />
              <Calendar
                onChange={setDate}
                value={date}
                minDate={new Date()}
                defaultView="month"
              />
            </div>

            <p>Attach Screenshot</p>
            <input
              accept=".png, .gif"
              className="image-upload"
              type="file"
              name="image"
              onChange={onChange}
              width="100px"
              height="100px"
            />

            <img src={process.env.REACT_APP_LOCALHOST + image} alt="" />

            <button
              type="button"
              className={styles.createBugBtn}
              onClick={onSubmit}
            >
              Create Bug
            </button>
            {error}
          </form>
        </div>
      )}
    </>
  )
}

export default CreateBug
