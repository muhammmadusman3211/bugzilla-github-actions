import useGetBugs from "../../helpers/hooks/useGetBugs"

import { Header } from "../index"
import { Manager, QA } from "./constants"

const ViewBugs = () => {
  const bugs = useGetBugs()
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_PROFILE))
  let disabled = user.role === Manager || user.role === QA

  return (
    bugs && (
      <>
        <Header />
        <div className="view-bugs-wrapper">
          {bugs.map((bug) => {
            return (
              <>
                <div className="card">
                  <div className="card-title">
                    <label>Title</label>
                    {bug.title}
                  </div>
                  <div className="card-body">
                    <label>Status</label>
                    <h4>{bug.status}</h4>
                    <label>Type</label>
                    <h4>{bug.type}</h4>
                    <label>Deadline</label>
                    <h4>{bug.deadline}</h4>
                    <img
                      src={process.env.REACT_APP_LOCALHOST + bug.image.path}
                      alt="Bug Screenshot"
                      width="100px"
                      height="100px"
                    />
                  </div>
                </div>

                <button disabled={disabled}>Mark as Resolved</button>
              </>
            )
          })}
        </div>
      </>
    )
  )
}

export default ViewBugs
