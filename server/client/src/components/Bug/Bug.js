import { useEffect } from "react"
import { GetBugsApi } from "../../api/api"
const Bug = () => {
  useEffect(() => {
    GetBugsApi("manager/bugs").then((res) => console.log(res))
  })
  return (
    <div className="bug-wrapper">
      <h2>BUG</h2>
      <p className="bug-creator">Usman</p>
      <h2 className="developer-list">Developers assigned on this project</h2>
      <ul>
        <li>Saad</li>
      </ul>
      <h2>Title</h2>
      {/* Title */}
      <select>
        <option>New</option>
        <option>Started</option>
        <option>Resolved</option>
      </select>
      <h2>Status</h2>

      {/* depends on type */}
      <h2>Deadline</h2>
      <h2>Type</h2>
      {/* Feature or Bug */}

      <h2>Screenshot</h2>
      {/* only .gif and .png */}
    </div>
  )
}

export default Bug
