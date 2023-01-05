import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { HeaderStyles } from "../../assets/index"
import * as Path from "../../constants"

function Header() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const loggedIn = useSelector((state) => state.loggedIn)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand m-2" href="/">
        Buddy-App
      </a>
      <div>
        <ul className="navbar-nav mr-auto">
          {user || loggedIn ? (
            <>
              {user.role === "manager" && (
                <li className="nav-item">
                  <Link
                    to={Path.CreateProjects}
                    className={HeaderStyles.linkStyle}
                  >
                    Create Projects
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to={Path.ViewProjects} className={HeaderStyles.linkStyle}>
                  View Projects
                </Link>
              </li>

              <li className="nav-item active">
                <Link to={Path.Logout} className={HeaderStyles.linkStyle}>
                  Logout
                </Link>
              </li>
              <li className={HeaderStyles.userInfo}>
                Logged In As: {user.name} Role: {user.role}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item active">
                <Link to={Path.Registration} className={HeaderStyles.linkStyle}>
                  Sign Up
                </Link>
              </li>
              <li className="nav-item active">
                <Link to={Path.Login} className={HeaderStyles.linkStyle}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
