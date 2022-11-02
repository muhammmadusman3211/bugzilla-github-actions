import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useAuthorize } from "../../helpers/hooks/useAuthorize"
import useGetDevelopers from "../../helpers/hooks/useGetDevelopers"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar/dist"
import { createProject } from "../../redux/actions/userActions"
import { editProject } from "../../redux/actions/userActions"
import { Header } from "../index"

import styles from "../../assets/scss/createprojects.module.css"

const CreateProjects = () => {
  const isAuthorized = useAuthorize("projects")
  const developers = useGetDevelopers()
  const titleRef = useRef()
  const idRef = useRef()
  const [developersList, setDevelopersList] = useState([])
  const [developersNameList, setDevelopersNameList] = useState([])
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("profile"))
  const { state } = useLocation()

  const [loading, setLoading] = useState(false)
  const create_url = process.env.REACT_APP_CREATE_PROJECT
  const edit_url = process.env.REACT_APP_EDIT_PROJECT

  const addDeveloperToList = (developerId) => {
    if (developersList.includes(developerId))
      setDevelopersList((developersList) =>
        developersList.filter((dev) => dev === developerId)
      )
    else setDevelopersList([...developersList, developerId])
  }
  const addDevelopersNameToList = (name) => {
    if (developersNameList.includes(name))
      setDevelopersNameList((developersName) =>
        developersName.filter((dev) => dev === name)
      )
    else setDevelopersNameList([...developersNameList, name])
  }
  const onEditSubmit = (event) => {
    event.preventDefault()

    dispatch(
      editProject(
        edit_url + "/" + state?.id,
        {
          id: state?.id,
          creator: user._id,
          title: titleRef.current.value,
          developers: developersList,
        },
        setLoading
      )
    )
    navigate("/view-projects")
  }

  const onCreateSubmit = (event) => {
    event.preventDefault()
    if (titleRef.current.value.length > 0) {
      setErrors(null)
      dispatch(
        createProject(
          create_url,
          {
            creator: user._id,
            title: titleRef.current.value,
            developers: developersList,
          },
          setLoading
        )
      )
      navigate("/view-projects")
    } else setErrors("Title cannot be empty")
  }
  return (
    isAuthorized && (
      <>
        <Header />
        <div className="create-project-wrapper">
          <div className="card p-4">
            <input value={user?._id} hidden></input>
            <input value={state?.id} hidden ref={idRef} />
            <div className="card-title">
              <label>Project Title</label>

              <br />
              <input defaultValue={state?.title} ref={titleRef} />
              {errors}
            </div>
            <div>
              <label>Assign Developers on this project</label>
              <br />
              <input value={developersNameList}></input>
              <br />
              <br />
              {developers &&
                developers.map((developer, index) => {
                  return (
                    <button
                      key={index}
                      value={developer.name}
                      onClick={() => {
                        addDeveloperToList(developer._id)
                        addDevelopersNameToList(developer.name)
                      }}
                      className={styles.developerBtn}
                    >
                      {developer.name}
                    </button>
                  )
                })}
            </div>
          </div>
          {state?.id ? (
            <button onClick={onEditSubmit} className={styles.createProjectBtn}>
              Edit Project
            </button>
          ) : (
            <button
              onClick={onCreateSubmit}
              className={styles.createProjectBtn}
            >
              Create Project
            </button>
          )}
        </div>
      </>
    )
  )
}

export default CreateProjects
