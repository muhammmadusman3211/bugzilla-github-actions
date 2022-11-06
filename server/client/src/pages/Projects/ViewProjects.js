import { useNavigate } from "react-router-dom"
import { useSnackbar } from "react-simple-snackbar"
import { useEffect, useState } from "react"

import { Header } from "../../components/index"
import {
  DeleteProjectApi,
  AssignBugApi,
  GetDevelopersApi,
  UpdateBugStatusApi,
} from "../../api/api"

import styles from "../../assets/scss/viewprojects.module.css"
import { options } from "../../helpers/options"
import { Developer, Manager, QA } from "../Bug/constants"

function ViewProjects() {
  const navigate = useNavigate()
  const [bugResolved, setBugResolved] = useState(false)
  const [projects, setProjects] = useState(false)
  const [bugAssigned, setBugAssigned] = useState(false)
  const [proejctDeleted, setProjectDeleted] = useState(false)
  const [openSnackbar] = useSnackbar(options)
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_PROFILE))
  const isManagerOrDeveloper =
    user?.role === Developer || user?.role === Manager // eslint-disable-line
  const isManagerOrQa = user?.role === QA || user?.role === Manager
  const isDeveloperOrQa = user?.role === QA || user?.role === Developer

  useEffect(() => {
    GetDevelopersApi(process.env.REACT_APP_GET_PROJECTS).then((res) =>
      setProjects(res.data.data.projects)
    )
  }, [proejctDeleted, bugResolved, bugAssigned])

  const handleReportBug = (id) => {
    navigate("/create-bugs", {
      state: {
        id,
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
      id,
      status: "resolved",
    }).then((res) => {
      openSnackbar("Bug Resolved Successfully")
      setBugResolved(true)
    })
  }

  const handleDeletingProject = (id) => {
    DeleteProjectApi(process.env.REACT_APP_DELETE_PROJECT, {
      user_id: user._id,
      id,
    }).then((res) => {
      openSnackbar("Project Deleted Succesfully")
      setProjectDeleted(true)
    })
  }

  const handleEditingProject = (id, title, developers, qa) => {
    navigate("/create-projects", {
      state: {
        id,
        title,
        developers,
        qa,
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
              projects.map((project, index) => {
                if (
                  project.developers.includes(user?._id) ||
                  user?.role !== "developer"
                ) {
                  return (
                    <div key={project._id} className={styles.projectWrapper}>
                      <h3>Project Title: {project?.title}</h3>

                      {project?.bugs?.length > 0 ? (
                        project?.bugs?.map((bug) => {
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
                                    type="button"
                                    onClick={() => handleAssignBug(bug._id)}
                                    disabled={isManagerOrQa}
                                    className={styles.button}
                                  >
                                    Assign this bug to yourself
                                  </button>
                                )}
                              {!isManagerOrQa && bug.status !== "resolved" && (
                                <button
                                  type="button"
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
                      {project?.developers?.length > 0 ? (
                        project?.developers?.map((developer) => {
                          return <p key={project._id}>{developer.name}</p>
                        })
                      ) : (
                        <p>There are no Developers assigned on this project</p>
                      )}
                      <b>QA List:</b>
                      {project?.qa?.length > 0 ? (
                        project?.qa?.map((qa) => {
                          return <p key={qa._id}>{qa.name}</p>
                        })
                      ) : (
                        <p>There are no QA assigned on this project</p>
                      )}
                      <br />
                      {!isManagerOrDeveloper && (
                        <button
                          type="button"
                          onClick={() => handleReportBug(project._id)}
                          disabled={isManagerOrDeveloper}
                          className={styles.button}
                        >
                          Report Bug
                        </button>
                      )}
                      {!isDeveloperOrQa && project.creator === user._id && (
                        <button
                          type="button"
                          onClick={() => handleDeletingProject(project._id)}
                          disabled={isDeveloperOrQa}
                          className={styles.button}
                        >
                          Delete Project
                        </button>
                      )}
                      {!isDeveloperOrQa && project.creator === user._id && (
                        <button
                          type="button"
                          onClick={() =>
                            handleEditingProject(
                              project._id,
                              project.title,
                              project.developers,
                              project.qa
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
                }
                return <p> Return Statement</p>
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProjects
