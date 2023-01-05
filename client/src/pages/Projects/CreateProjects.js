import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"

import { useAuthorize } from "../../helpers/hooks/useAuthorize"
import useGetDevelopers from "../../helpers/hooks/useGetDevelopers"
import { createProject, editProject } from "../../redux/actions/userActions"
import { Header, Spinner } from "../../components/index"
import { options } from "../../helpers/options"
import { Projects } from "./constants"

import styles from "../../assets/scss/createprojects.module.css"

function CreateProjects() {
  const isAuthorized = useAuthorize(Projects)
  const [developers, qa] = useGetDevelopers()
  const titleRef = useRef()
  const idRef = useRef()

  const [openSnackbar] = useSnackbar(options)
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const user = JSON.parse(localStorage.getItem("profile"))

  const devNames = state?.developers // eslint-disable-line
    ? state?.developers.map((dev) => dev.name)
    : ""
  const devIds = state?.developers
    ? state?.developers.map((dev) => dev._id)
    : ""

  const qaNames = state?.qa ? state?.qa.map((Qa) => Qa.name) : ""
  const qaIds = state?.qa ? state?.qa.map((Qa) => Qa._id) : ""
  const [developersList, setDevelopersList] = useState(devIds)
  const [developersNameList, setDevelopersNameList] = useState(devNames)

  const [qaList, setQaList] = useState(qaIds)
  const [qaNameList, setQaNameList] = useState(qaNames)
  const createUrl = process.env.REACT_APP_CREATE_PROJECT
  const editUrl = process.env.REACT_APP_EDIT_PROJECT

  const addDeveloperToList = (developerId) => {
    if (developersList.includes(developerId))
      setDevelopersList((developer) =>
        developer.filter((id) => id !== developerId)
      )
    else setDevelopersList([...developersList, developerId])
  }

  const addQaToList = (qaId) => {
    if (qaList.includes(qaId)) setQaList((Qa) => Qa.filter((id) => id !== qaId))
    else setQaList([...qaList, qaId])
  }
  const addQaNameToList = (name) => {
    if (qaNameList.includes(name))
      setQaNameList((qaName) => qaName.filter((Qa) => Qa !== name))
    else setQaNameList([...qaNameList, name])
  }

  const addDevelopersNameToList = (name) => {
    if (developersNameList.includes(name))
      setDevelopersNameList((developersName) =>
        developersName.filter((dev) => dev !== name)
      )
    else setDevelopersNameList([...developersNameList, name])
  }
  const onEditSubmit = (event) => {
    event.preventDefault()
    dispatch(
      editProject(
        editUrl + state.id,
        {
          creator: user._id,
          title: titleRef.current.value,
          developers: developersList,
          qa: qaList,
        },
        navigate
      )
    )
  }

  const onCreateSubmit = (event) => {
    event.preventDefault()
    if (titleRef.current.value.length > 0) {
      dispatch(
        createProject(
          createUrl,
          {
            creator: user._id,
            title: titleRef.current.value,
            developers: developersList,
            qa: qaList,
          },
          navigate
        )
      )
    }
  }
  return (
    isAuthorized && (
      <>
        <Header />
        {loading ? (
          <Spinner />
        ) : (
          <form action="" method="post" className="create-project-wrapper">
            <div className="card p-4">
              <input value={user?._id} hidden />
              <input value={state?.id} hidden ref={idRef} />
              <div className="card-title">
                <p>Project Title</p>

                <br />
                <input defaultValue={state?.title} ref={titleRef} />
              </div>
              <div>
                <p>Assign Developers on this project</p>
                <br />

                <input
                  defaultValue={state?.developers}
                  value={developersNameList}
                />

                <br />
                <br />
                {developers &&
                  developers.map((developer) => {
                    return (
                      <button
                        type="button"
                        key={developer._id}
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

                <br />
                <input defaultValue={state?.qa} value={qaNameList} />

                <br />
                <br />
                {qa &&
                  qa.map((Qa) => {
                    return (
                      <button
                        type="button"
                        key={Qa._id}
                        value={Qa.name}
                        onClick={() => {
                          addQaToList(Qa._id)
                          addQaNameToList(Qa.name)
                        }}
                        className={styles.developerBtn}
                      >
                        {Qa.name}
                      </button>
                    )
                  })}
              </div>
            </div>
            {state?.id ? (
              <button
                type="button"
                onClick={onEditSubmit}
                className={styles.createProjectBtn}
              >
                Edit Project
              </button>
            ) : (
              <button
                type="button"
                onClick={onCreateSubmit}
                className={styles.createProjectBtn}
              >
                Create Project
              </button>
            )}
            {error}
          </form>
        )}
      </>
    )
  )
}

export default CreateProjects
