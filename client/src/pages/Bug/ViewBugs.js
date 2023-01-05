import { Header } from "../../components/index"
import { Manager, QA } from "./constants"

function ViewBugs() {
  const bugs = useGetBugs()
  const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_PROFILE))
  const disabled = user.role === Manager || user.role === QA

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
                    <p>Title</p>
                    {bug.title}
                  </div>
                  <div className="card-body">
                    <p>Status</p>
                    <h4>{bug.status}</h4>
                    <p>Type</p>
                    <h4>{bug.type}</h4>
                    <p>Deadline</p>
                    <h4>{bug.deadline}</h4>
                    <img
                      src={process.env.REACT_APP_LOCALHOST + bug.image.path}
                      alt="Bug Screenshot"
                      width="100px"
                      height="100px"
                    />
                  </div>
                </div>

                <button type="button" disabled={disabled}>
                  Mark as Resolved
                </button>
              </>
            )
          })}
        </div>
      </>
    )
  )
}

export default ViewBugs
