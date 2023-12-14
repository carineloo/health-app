import { NavLink } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Nav = ({ authToken, setShowBoarding, showBoarding, setSignUp }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  let navigate = useNavigate()

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)

    if (true) navigate('/')
    window.location.reload()
  }

  const handleClick = () => {
    setShowBoarding(true)
    setSignUp(false) // logging in
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="/">Digital Health<span id="nav-title-acronym"> Fully Accessible Intelligent Tool for Health</span></a>
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/" className="nav-item nav-link">Home</NavLink> <span>|</span>

          {authToken && <>
            <NavLink to="/trainingvideos" className="nav-item nav-link">
              Training Videos
            </NavLink><span>|</span> </>
          }

          <NavLink to="/help" className="nav-item nav-link">
            Help
          </NavLink> <span>|</span>

          {authToken && <>
            <NavLink to="/plots" className="nav-item nav-link">
              Plots
            </NavLink> <span>|</span> </>
          }

          {!authToken &&
            <button
              className="nav-item nav-link"
              id="log-button"
              onClick={handleClick}
              disabled={showBoarding}>
              Log in<i className="fa-regular fa-user fa icon"></i>
            </button>
          }

          {/* logged in */}
          {authToken && <>
            <NavLink to="/myaccount" className="nav-item nav-link">
              Account<i className="fa-regular fa-user fa icon"></i>
            </NavLink>

            <NavLink className="nav-item nav-link" onClick={logout} id="log-button">
              Logout
            </NavLink>
          </>}
        </div>
      </div>
    </nav>
  )
}
export default Nav