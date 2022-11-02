import useGetBugs from "../../helpers/hooks/useGetBugs"
import { useAuthorize } from "../../helpers/hooks/useAuthorize"

import { Header } from "../index"

const ViewBugs = () => {
  const bugs = useGetBugs()
  const user = JSON.parse(localStorage.getItem("profile"))
  let disabled = user.role === "manager" || user.role === "qa"
  // const isAuthorized = useAuthorize("manager/bugs")

  return (
    // isAuthorized &&
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
                      src={`http://localhost:3000/${bug.image.path}`}
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
