import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { HeaderStyles } from "../../assets/index"

const Header = () => {
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
              <li className="nav-item">
                <Link to="/create-projects" className={HeaderStyles.linkStyle}>
                  Create Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-projects" className={HeaderStyles.linkStyle}>
                  View Projects
                </Link>
              </li>

              <li className="nav-item active">
                <Link to="/logout" className={HeaderStyles.linkStyle}>
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
                <Link to="/" className={HeaderStyles.linkStyle}>
                  Sign Up
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/login" className={HeaderStyles.linkStyle}>
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
