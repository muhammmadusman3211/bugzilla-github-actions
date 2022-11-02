import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"
import { useEffect, useState } from "react"

import Header from "../Header/Header"
import {
  DeleteProjectApi,
  AssignBugApi,
  GetDevelopersApi,
  UpdateBugStatusApi,
} from "../../api/api"

import styles from "../../assets/scss/viewprojects.module.css"
import { options } from "../../helpers/options"
import { Developer, Manager, QA } from "../Bug/constants"

const ViewProjects = () => {
  const navigate = useNavigate()
  const [bugResolved, setBugResolved] = useState(false)
  const [projects, setProjects] = useState(false)
  const [bugAssigned, setBugAssigned] = useState(false)
  const [proejctDeleted, setProjectDeleted] = useState(false)
  const [openSnackbar] = useSnackbar(options)
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_PROFILE))
  const isManagerOrDeveloper =
    user?.role === Developer || user?.role === Manager
  const isManagerOrQa = user?.role === QA || user?.role === Manager
  const isDeveloperOrQa = user?.role === QA || user?.role === Developer

  useEffect(() => {
    GetDevelopersApi(process.env.REACT_APP_GET_PROJECTS)
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.log(err))
  }, [proejctDeleted, bugResolved, bugAssigned])

  const handleReportBug = (id) => {
    navigate("/create-bugs", {
      state: {
        id: id,
      },
    })
  }

  const handleAssignBug = (bugId) => {
    AssignBugApi(process.env.REACT_APP_ASSIGN_BUG, {
      id: bugId,
      user_id: user?._id,
    }).then((res) => {
      openSnackbar("Bug Assigned to you")
      setBugAssigned(true)
    })
  }

  const handleBugResolved = (id) => {
    UpdateBugStatusApi(process.env.REACT_APP_UPDATE_BUG_STATUS, {
      id: id,
      status: "resolved",
    }).then((res) => {
      openSnackbar("Bug Resolved Successfully")
      setBugResolved(true)
    })
  }

  const handleDeletingProject = (id) => {
    DeleteProjectApi(process.env.REACT_APP_DELETE_PROJECT, {
      user_id: user._id,
      id: id,
    }).then((res) => {
      openSnackbar("Project Deleted Succesfully")
      setProjectDeleted(true)
    })
  }

  const handleEditingProject = (id, title, developers, developersId) => {
    developersId.splice(0, 1)
    navigate("/create-projects", {
      state: {
        id: id,
        title: title,
        developers: developers,
        developersId: developersId,
      },
    })
  }
  return (
    <>
      <Header />
      <div className="view-project-wrapper ">
        <div className="card p-4">
          <div className="card-title">
            <h1>Projects</h1>
          </div>
          <div className="card-body">
            {projects &&
              projects.map((project) => {
                if (
                  project.developers.includes(user?._id) ||
                  user?.role !== "developer"
                ) {
                  return (
                    <div className={styles.projectWrapper}>
                      <h3>Project Title: {project.title}</h3>

                      {project.bugsData.length > 0 ? (
                        project.bugsData.map((bug) => {
                          return (
                            <>
                              <hr />
                              <h3>BUG</h3>
                              <p>
                                <b>Title: </b> {bug.title}
                              </p>
                              <p>
                                <b>Status:</b> {bug.status}
                              </p>
                              <p>
                                <b>Type: </b>
                                {bug.type}
                              </p>
                              <b>Screenshot of Bug:</b>
                              <img
                                src={`http://localhost:3000/${bug?.image?.path}`}
                                alt="Bug screenshot"
                                width="100px"
                                height="100px"
                              />
                              {!isManagerOrQa &&
                                !bug.developers.includes(user?._id) && (
                                  <button
                                    onClick={() => handleAssignBug(bug._id)}
                                    disabled={isManagerOrQa}
                                    className={styles.button}
                                  >
                                    Assign this bug to yourself
                                  </button>
                                )}
                              {!isManagerOrQa && bug.status !== "resolved" && (
                                <button
                                  onClick={() => handleBugResolved(bug._id)}
                                  disabled={isManagerOrQa}
                                  className={styles.button}
                                >
                                  Mark as Resolved
                                </button>
                              )}
                              <hr />
                            </>
                          )
                        })
                      ) : (
                        <p>
                          There are no Bugs. Ask your QA to report a bug, if any
                        </p>
                      )}
                      <br />
                      <b>Developers List:</b>
                      {project.developersData.length > 0 ? (
                        project.developersData.map((developer) => {
                          return <p>{developer.name}</p>
                        })
                      ) : (
                        <p>There are no Developers assigned on this project</p>
                      )}
                      <br />
                      {!isManagerOrDeveloper && (
                        <button
                          onClick={() => handleReportBug(project._id)}
                          disabled={isManagerOrDeveloper}
                          className={styles.button}
                        >
                          Report Bug
                        </button>
                      )}
                      {!isDeveloperOrQa && project.creator === user._id && (
                        <button
                          onClick={() => handleDeletingProject(project._id)}
                          disabled={isDeveloperOrQa}
                          className={styles.button}
                        >
                          Delete Project
                        </button>
                      )}
                      {!isDeveloperOrQa && project.creator === user._id && (
                        <button
                          onClick={() =>
                            handleEditingProject(
                              project._id,
                              project.title,
                              project.developersData,
                              project.developers
                            )
                          }
                          disabled={
                            isDeveloperOrQa || project.creator !== user._id
                          }
                          className={styles.button}
                        >
                          Edit Project
                        </button>
                      )}
                    </div>
                  )
                } else return null
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProjects
